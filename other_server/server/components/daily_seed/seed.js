/**
 * Created by code on 5/3/16.
 */
var Daily = require('../../api/dailies/dailies.model');
var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost/urf3');

async.series([
  function(callback){ Daily.find({}).remove(callback); },
  function(callback){ Daily.create({
    championId: "2", //generate random champion
    lobbyId: "dailylob#2" //create new lobby
  }, callback); },
  function(callback){ Daily.create({
    championId: "32",
    lobbyId: "dailylob#32"
  }, callback); },
  function(callback){ Daily.create({
    championId: "25",
    lobbyId: "dailylob#25"
  }, callback); }
], function(err, results){
  mongoose.connection.close();
});





