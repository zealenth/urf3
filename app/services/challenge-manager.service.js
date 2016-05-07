class ChallengeManager {
  constructor(socket, $q, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.socket = socket;
    this.$q = $q;

    this.deferred = $q.defer();
    this.challengeMap = {};
    this.challenges = [];

    socket.on('challenges:init', (challenges) => {
      this.challenges.length = 0;
      _.each(challenges, (challenge) => {
        if (this.challengeMap[challenge._id]) {
          _.extend(this.challengeMap[challenge._id], challenge);
        } else {
          this.challengeMap[challenge._id] = challenge;
        }

        this.challenges.push(this.challengeMap[challenge._id]);
      });
      this.deferred.resolve(this.challenges);
    });
    socket.on('challenges:error', (error) => {
      const warning = this.$mdDialog.alert({
        title: 'Error',
        textContent: error,
        ok: 'Close',
      });
      this.$mdDialog.show(warning);
    });
    socket.on('challenges:add', (challenge) => {
      if (this.challengeMap[challenge._id]) {
        _.extend(this.challengeMap[challenge._id], challenge);
      } else {
        this.challengeMap[challenge._id] = challenge;
      }

      if (_._.findIndex(this.challenges, { _id: challenge._id }) === -1) {
        this.challenges.push(this.challengeMap[challenge._id]);
      }

    });

    socket.on('authenticated', () => {
      socket.emit('challenges:init');
    });
  }

  getChallenges() {
    return this.challenges;
  }

  getChallenge(id) {
    //should this be promised based?
    //good candidate for rxjs stream.
    if (!this.challengeMap[id]) {
      this.challengeMap[id] = {
        _id: id,
      };
    }

    return this.challengeMap[id];
  }

  createChallenge(newChallenge) {
    var deferred = this.$q.defer();
    this.socket.emit('challenges:new', newChallenge, (err, challenge) => {
      if (challenge) {
        deferred.reject(err);
      }

      deferred.resolve(challenge);
    });
    return deferred.promise;

  }

  joinChallenge(id) {
    var deferred = this.$q.defer();
    this.socket.emit('challenges:join', id, (err, challenge) => {
      if (challenge) {
        deferred.reject(err);
      }

      deferred.resolve(challenge);
    });
    return deferred.promise;
  }
}

angular.module('urf3')
  .service('challengeManager', ChallengeManager);
