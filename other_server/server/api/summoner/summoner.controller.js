/**
 * Created by code on 4/28/16.
 */
// Get a single stats
var User = require('./summoner.model');
var Warden = require('../../components/rito_jail/warden');

exports.show = function(req, res) {
  console.log(req.params);
  User.findOne({name : req.params.id}, function (err, stats) {
    if(err) { return handleError(res, err); }
    console.log(stats);
    if(!stats) {
      var user = Warden.lookupUser(req.params.id);
      if(user) {
        var record = new User();
        record.name = req.params.id;
        record.summonerid = user;
        record.save();
        return res.json(record);
      } else {
        return res.sendStatus(404);
      }
    } else {
      return res.json(stats);
    }
  });
};

// Creates a new stats in the DB.
exports.create = function(req, res) {
  User.create(req.body, function(err, stats) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(stats);
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
