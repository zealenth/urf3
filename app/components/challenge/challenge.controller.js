class ChallengeCtrl {
  constructor(challengeManager, currentUser) {
    this.challenges = challengeManager.getChallenges();
    this.currentUser = currentUser;
  }
}

angular.module('urf3')
  .controller('challengeCtrl', ChallengeCtrl);
