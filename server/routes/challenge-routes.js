'use strict';



function initChallengeRoutes(app, io, mongoose) {
  var challengeSchema = new mongoose.Schema( {
    name: String,
    start: { type: Date },
    end: { type: Date },
    owner: String,
    players: []
  } );

  var Challenge = mongoose.model( 'Challenge', challengeSchema );

  var chal = new Challenge( {
      name: 'Challenge 1',
      start: Date.now(),
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

  chal.save()
    .then( function(model) {
      console.log(model);
    });

  io.on('authenticated', function (socket) {
    socket.on('challenges:init', function() {
      Challenge.find({user: socket.decoded_token.user})
        .then((docs) => {
          if (docs && docs.length) {
            socket.emit('challenges:Init', docs);
          }
        });
    });
  });
}


module.exports.initChallengeRoutes = initChallengeRoutes;
