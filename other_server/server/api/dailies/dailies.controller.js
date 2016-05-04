/**
 * Created by code on 5/3/16.
 */
// Get a single stats
var Daily = require('./summoner.model');
var Warden = require('../../components/rito_jail/warden');

exports.index = function(req, res) {
  Daily.find(function (err, statss) {
    if(err) { return handleError(res, err); }
    return res.json(200, statss);
  });
};


// Creates a new stats in the DB.
exports.create = function(req, res) {
  Daily.create(req.body, function(err, stats) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(stats);
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
