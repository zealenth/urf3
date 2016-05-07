'use strict';

var Challenge;

function getChallengeModel(mongoose) {
  if (Challenge) {
    return Challenge;
  }
  var challengeSchema = new mongoose.Schema( {
    name: String,
    start: { type: Date },
    end: { type: Date },
    createdAt: { type: Date, default: Date.now },
    owner: String,
    players: []
  } );

  Challenge = mongoose.model( 'Challenge', challengeSchema );
  return Challenge;
}

module.exports.getChallengeModel = getChallengeModel;