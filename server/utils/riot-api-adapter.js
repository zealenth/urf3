'use strict';
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const RiotApiQueue = new require('./riot-api-queue').RiotApiQueue;
const _ = require('lodash');

class RiotApiAdapter {
  constructor(options) {
    options = options ? options : {};
    this.key = options.apiKey;
    this.queue = options.queue ? new options.queue() : new RiotApiQueue();
    this.lowPrioityQueue = options.queue ? new options.queue() : new RiotApiQueue();
    this.rateLimitPerSecond = options.rateLimitPerSeocnd ? options.rateLimitPerSeocnd : 10;
    this.rateLimitPerTenMinutes = options.rateLmiitPerTenMinutes ? options.rateLmiitPerTenMinutes : 500;
    this.apiRoot = 'https://na.api.pvp.net/api/lol/na/v1.4/';
  }

  _addRequest(req) {
    this.queue.push(req);
  }
  /*
  example:
  {
     "id": 24612654,
     "name": "ZealBit",
     "profileIconId": 1012,
     "summonerLevel": 30,
     "revisionDate": 1462770675000
  }
   */
  getPlayer(name) {
    name = name.toLowerCase();
    //TODO: eventually rate limit with a queue
    return request(this.apiRoot + 'summoner/by-name/' + name + '?api_key=' + this.key)
      .then( (resp) => {
        console.log(resp);
        let player = {};
        if (_.isObject(resp.body)) {
          player =  resp.body;
        } else {
          try {
            player =  JSON.parse(resp.body);
          }
          catch(e) {
            player =  {};
          }
        }
        player = player[name] ? player[name] : {};
        return player;
      });
  }

  getChampionMasteries(playerId) {
    return request('https://na.api.pvp.net/championmastery/location/NA1/player/' + playerId +
    '/champions?api_key=' + this.key)
      .then((resp) => {
        let data = resp.body;
        if(!_.isArray(resp.body)) {
          data = JSON.parse(resp.body);
        }
        return data;
      })
  }

}

module.exports.RiotApiAdapter = RiotApiAdapter;
