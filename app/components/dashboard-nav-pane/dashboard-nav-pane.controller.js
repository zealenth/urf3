class DashboardCtrl {
  constructor(challengeManager, $state) {
    this.challenges = challengeManager.getChallenges();
    this.$state = $state;
  }

  navigateToChallenge(challenge) {
    this.$state.go('home.challenge', { id: challenge._id });
  }

  createChallenge() {
    this.$state.go('home.newChallenge');
  }
}

angular.module('urf3')
  .controller('dashboardNavPaneCtrl', DashboardCtrl);
