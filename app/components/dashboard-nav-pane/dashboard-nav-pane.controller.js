class DashboardCtrl {
  constructor(challengeManager) {
    this.challenges = challengeManager.getChallenges();
  }
}

angular.module('urf3')
  .controller('dashboardNavPaneCtrl', DashboardCtrl);
