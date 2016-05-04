'use strict';

var jwt = require('jsonwebtoken');
var _ = require('lodash');
var expressJwt = require('express-jwt');
var socketJwt = require('socketio-jwt');

var bb = require('bluebird');
var request = bb.promisify(require('request'));

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });
var jwtSecret = process.env.jwtSecret || 'jwt-devel';

//TODO: this should probably go!
var recaptchaKey = process.env.recaptcha_key || '';

function isValidUser(user,pass, User) {
  if(!User) {
    //for local development we only use test/test
    return bb.all([(user === 'test' && pass === 'test')]);
  }
  //TODO: properly compare hashes and such
  return User.find({ user: user, pass: pass }).exec()
    .then(function (docs) {
      return docs && docs.length === 1;
    })
    .catch(function (err) {
      return false;
    });
}

function validateRecaptcha(req) {
  if (!recaptchaKey) {
    return bb.all([ true ]);
  }
  if (!req.body.recaptcha) {
    return bb.all( [ false ] );
  }
  return request('https://www.google.com/recaptcha/api/siteverify?secret=' +
      recaptchaKey + '&response=' + req.body.recaptcha)
      .then( function(resp) {
        var body = JSON.parse(resp.body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
          return true;
        }
        return false;
      });
}

function createAuthRoutes(app, io, mongoose) {
  //TODO should we globally use json body parser? app.use( bodyParser.json() );
  var userSchema = new mongoose.Schema( {
    user: String,
    pass: String,
    email: String
  } );

  var User = mongoose.model( 'User', userSchema );

  function authenticate(req, res, next) {
    var obj = req.body;

    isValidUser(obj.user, obj.password, User)
      .then(function(valid) {
        if(valid) {
          req.user = obj.user;
          req.pass = obj.password;
          return next();
        }
        res.status(401).end('Username or password is incorrect.');
      })
      .catch(function(err) {
        res.status(401).end('Username or password is incorrect.');
      });
  }

  app.post('/register', jsonParser, function(req, res ) {
    //if user exists, return error
    User.find({ user: req.body.user }).exec()
      .then(function(docs) {
        if(_.isArray( docs ) && docs.length >= 1 ) { //lets return objects for single items.
          return res.send( { error: 'That user already exists' } );
        }
        validateRecaptcha(req)
            .then(function(valid) {
              if(!valid) {
                return res.send( { error: 'Recaptcha was invalid' } );
              }
              var newUser = new User({
                user: req.body.user,
                pass: req.body.password, //TODO: salt and hash
                email: req.body.email
              });
              newUser.save( function(err, user) {
                if( err ) {
                  return res.send( {error: err });
                }
                var token = jwt.sign({
                  user: req.user,
                  password: req.password
                }, jwtSecret );
                res.send({
                  token: token
                });
              } );
            });
      })
      .catch(function(err) {
        res.send({error: err});
      });
  } );

  app.post('/login', jsonParser, authenticate, function(req, res) {
    var token = jwt.sign({
      user: req.user,
      password: req.password
    }, jwtSecret );
    res.send({
      token: token
    });
  });

  app.use(expressJwt({secret: jwtSecret}).unless({ path: [ '/login' ]}));
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });

  io.sockets
    .on('connection', socketJwt.authorize({
      secret: jwtSecret,
      timeout: 1500000 // delay to send the authentication message
    })).on('authenticated', function(socket) {
      //this socket is authenticated, we are good to handle more events from it.
      console.log('hello! ' + socket.decoded_token.user);
      //frameowrk issues emit: socket.emit( 'authenticated' );
    });
}

module.exports.createAuthRoutes = createAuthRoutes;
