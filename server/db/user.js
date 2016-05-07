'use strict';

var User;
function getUserModel(mongoose) {
  if (User) {
    return User;
  }
  var userSchema = new mongoose.Schema( {
    user: String,
    pass: String,
    email: String
  } );

  User = mongoose.model( 'User', userSchema );
  return User;
}

module.exports.getUserModel = getUserModel;
