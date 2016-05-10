'use strict';
var _  = require('lodash');
var Promise = require('bluebird');

function initChallengeRoutes(app, io, mongoose, riotApi) {
  var User = require('../db/user').getUserModel(mongoose);
  var Challenge = require('../db/challenge').getChallengeModel(mongoose);


  function _getPlayerInfo(name) {
    return User.find({user:name})
      .then(function(docs) {
        if (docs && docs[0]) {
          //TODO: look up riot api stuff
          var user = docs[0];
          return riotApi.getChampionMasteries(user.lolId)
            .then((masteries) => {
              let currentMastery = 0;
              _.each(masteries, (mastery) => {
                currentMastery += mastery.championPoints;
              });
              return {
                user: name,
                startingPoints: currentMastery,
                currentPoints: currentMastery
              }
            });
        } else {
          return {
            user: name,
            startingPoints: 0,
            currentPoints: 0
          };
        }
      });
  }

  io.on('authenticated', function (socket) {
    socket.on('challenges:init', function() {
      Challenge.find({players: {$elemMatch: {user:socket.decoded_token.user}}})
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
          challenge.players.push(player);
          var chal = new Challenge(challenge);
          chal.save()
            .then( function(chal) {
              socket.emit('challenges:add', chal);
              cb('', chal);
            })
            .catch( function(err) {
              cb(err, chal);
            });
        });
    });

    socket.on('challenges:refresh',function(id,cb) {
      Challenge.find({_id: id}).exec()
        .then(function(docs) {
          if ( !docs || !docs.length ) {
            cb( 'Challenge does not exist', null );
            return null;
          }
          var challenge = docs[ 0 ];
          var newPlayers = [];
          var promises = [];
          _.each(challenge.players, (player) => {
            var prom =_getPlayerInfo(player.user)
              .then((newPlayer) => {
                newPlayer.startingPoints = player.startingPoints;
                newPlayers.push(newPlayer);
              });
            promises.push(prom);
          });
          Promise.all(promises)
          .then(() => {
              challenge.players = newPlayers;
              challenge.save()
                .then((chal) => {
                  socket.emit('challenges:add', chal);
                  cb('', chal);
                })
            });
        });
    });

    socket.on('challenges:join', function(id, cb) {
      Challenge.find({_id: id}).exec()
        .then(function(docs) {
          if(!docs || !docs.length) {
            cb('Challenge does not exist', null);
            return null;
          }
          var challenge = docs[0];
          _getPlayerInfo(socket.decoded_token.user)
            .then( function(player) {
              challenge.players.push(player);
              challenge.save()
                .then( function(chal) {
                  socket.emit('challenges:add', chal);
                  cb('', chal);
                })
                .catch( function(err) {
                  cb(err, chal);
                });
            });

        });
    });
  });
}

module.exports.initChallengeRoutes = initChallengeRoutes;
