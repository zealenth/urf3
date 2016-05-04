class ChallengeManager {
  constructor(socket, $q, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.socket = socket;

    this.deferred = $q.defer();
    this.challengeMap = {};
    this.challenges = [];

    socket.on('challenges:init', (challenges) => {
      this.challenges.length = 0;
      _.each(challenges, (challenge) => {
        if (this.challengeMap[challenge.id]) {
          _.extend(this.challengeMap[challenge.id], challenge);
        } else {
          this.challengeMap[challenge.id] = challenge;
        }

        this.challenges.push(this.challengeMap[challenge.id]);
      });
      this.deferred.resolve(this.challenges);
    });
    socket.on('challenges:error', (error) => {
      const warning = this.$mdDialog.alert({
        title: 'Error',
        textContent: error,
        ok: 'Close',
      });
      $mdDialog.show(warning);
    });
    socket.on('challenges:add', (challenge) => {
      if (this.challengeMap[challenge.id]) {
        _.extend(this.challengeMap[challenge.id], challenge);
      } else {
        this.challengeMap[challenge.id] = challenge;
      }

      this.challenges.push(this.challengeMap[challenge.id]);
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
        id: id,
      };
    }

    return this.challengeMap[id];
  }
}

angular.module('urf3')
  .service('challengeManager', ChallengeManager);
