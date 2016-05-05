'use strict';



function initChallengeRoutes(app, io, mongoose) {
  var challengeSchema = new mongoose.Schema( {
    name: String,
    start: { type: Date },
    end: { type: Date },
    createdAt: { type: Date, default: Date.now },
    owner: String,
    players: []
  } );

  var Challenge = mongoose.model( 'Challenge', challengeSchema );
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
       /*.then( function() {
          var chal = new Challenge( {
            name: 'Challenge 2',
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
          });
          chal.save();
      } );*/
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
      /*.then( function() {
       var chal = new Challenge( {
       name: 'Challenge 2',
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
       });
       chal.save();
       } );*/
    });
  io.on('authenticated', function (socket) {
    socket.on('challenges:init', function() {
      Challenge.find({players: {$elemMatch: {name:socket.decoded_token.user}}}).exec()
        .then((docs) => {
          if (docs && docs.length) {
            socket.emit('challenges:init', docs);
          }
        })
        .catch( function(err) {
          console.log(err);
        });
    });
  });
}


module.exports.initChallengeRoutes = initChallengeRoutes;
