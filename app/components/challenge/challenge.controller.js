class ChallengeCtrl {
  constructor(challengeManager, currentUser) {
    this.challenge = challengeManager.getChallenge(this.id);
    this.currentUser = currentUser;
  }
}

angular.module('urf3')
  .controller('challengeCtrl', ChallengeCtrl);
