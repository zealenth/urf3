'use strict';



function initChallengeRoutes(app, io, mongoose) {
  var User = require('../db/user').getUserModel(mongoose);
  var Challenge = require('../db/challenge').getChallengeModel(mongoose);


  function _getPlayerInfo(name) {
    return User.find({name:name})
      .then(function(docs) {
        if (docs && docs[0]) {
          //TODO: look up riot api stuff
          return {
            user: name,
            startingPoints: 50,
            currentPoints: 150
          };
        } else {
          return {
            name: name
          };
        }
      });
  }
  
  Challenge.remove({})
    .then( function() {
      var chal = new Challenge( {
        name: 'Challenge 1',
        start: Date.now(),
        end: Date.now(),
        owner: 'test',
        players: [
          {
            name: 'test',
            startingPoints: 100,
            currentPoints: 500
          },
          {
            name: 'test2',
            startingPoints: 200,
            currentPoints: 400
          }
        ]
      } );
      chal.save();
    })
    .catch( function() {
      var chal = new Challenge( {
        name: 'Challenge 1',
        start: Date.now(),
        end: Date.now(),
        owner: 'test',
        players: [
          {
            name: 'test',
            startingPoints: 100,
            currentPoints: 500
          },
          {
            name: 'test2',
            startingPoints: 200,
            currentPoints: 400
          }
        ]
      } );
      chal.save();

    });
  io.on('authenticated', function (socket) {
    socket.on('challenges:init', function() {
      Challenge.find({players: {$elemMatch: {name:socket.decoded_token.user}}})
        .then((docs) => {
          if (docs && docs.length) {
            socket.emit('challenges:init', docs);
          }
        })
        .catch( function(err) {
          console.log(err);
        });
    });

    socket.on('challenges:new', function(challenge, cb) {
      challenge.owner = socket.decoded_token.user;
      challenge.players = [];
      _getPlayerInfo(challenge.owner)
        .then( function(player) {
          console.log('inside then');
          challenge.players.push(player);
          var chal = new Challenge(challenge);
          chal.save()
            .then( function(chal) {
              console.log('inside Save');
              socket.emit('challenges:add', chal);
              cb('', chal);
            })
            .catch( function(err) {
              cb(err, chal);
            });
        });
    });
  });
}


module.exports.initChallengeRoutes = initChallengeRoutes;
