class ChallengeManager {
  constructor(socket, $q, $mdDialog) {
    this.$mdDialog = $mdDialog;
    this.socket = socket;

    this.deferred = $q.defer();
    this.challenges = [];
    socket.on('authenticated', () => {
      socket.on('challenges:init', (challenges) => {
        _.each(challenges, (challenge) => {
          this.challenges.push(challenge);
        });
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
        this.challenges.push(challenge);
      });
      socket.emit('challenges:init');

    });
  }

  getChallenges() {
    return this.challenges;
  }
}

angular.module('urf3')
  .service('challengeManager', ChallengeManager);
