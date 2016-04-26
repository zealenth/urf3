'use strict';

var jwt = require('jsonwebtoken');
var _ = require('lodash');
var expressJwt = require('express-jwt');
var socketJwt = require('socketio-jwt');

var jwtSecret = process.env.jwtSecret || 'jwt-devel';

function isValidUser(user,pass) {
  //TODO: Users should be in the db
  if(user === 'test' && pass === 'test' ) {
    return true;
  }
  return false
}

function authenticate(req, res, next) {
  var buffer = '';
  req.on('data', function(data) {
    buffer += data.toString();
  }).on('end', function() {
    var obj = buffer;
    if (!_.isObject(obj)) {
      obj = JSON.parse(obj);
    }
    if(isValidUser(obj.user, obj.password)) {
      req.user = obj.user;
      req.pass = obj.password;
      return next();
    }
    res.status(401).end('Username or password is incorrect.');
  });
}

function createAuthRoutes(app, io) {
  app.post('/login', authenticate, function(req, res) {
    var token = jwt.sign({
      user: req.user,
      password: req.password
    }, jwtSecret );
    res.send({
      token: token
    });
  });
  app.use(expressJwt({secret: jwtSecret}).unless({ path: [ '/login' ]}));

  io.sockets
    .on('connection', socketJwt.authorize({
      secret: jwtSecret,
      timeout: 1500000 // delay to send the authentication message
    })).on('authenticated', function(socket) {
      //this socket is authenticated, we are good to handle more events from it.
      console.log('hello! ' + socket.decoded_token.user);
    });
}

module.exports.createAuthRoutes = createAuthRoutes;
