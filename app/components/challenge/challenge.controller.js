class ChallengeCtrl {
  constructor(challengeManager, currentUser, $mdDialog, $scope) {
    this.challenge = challengeManager.getChallenge(this.id);
    this.challengeManager = challengeManager;
    this.currentUser = currentUser;
    this.$mdDialog = $mdDialog;
    this.maxPoints = 1;

    //ideally challenges would be an observable and we
    // wouldn't have to do this nasty watch.
    $scope.$watch('ctrl.challenge.players.length', () => {
      this._calculateMaxPoints();
    });
  }

  _calculateMaxPoints() {
    if (this.challenge) {
      var maxPlayer = _.maxBy(this.challenge.players, (player) => {
        return player.currentPoints - player.startingPoints;
      });
      if (maxPlayer) {
        this.maxPoints = maxPlayer.currentPoints - maxPlayer.startingPoints;
      }

      this.maxPoints = this.maxPoints ? this.maxPoints : 1;

    }
  }

  refresh() {
    this.refreshingRequest = true;
    this.challengeManager.refreshChallenge(this.id)
      .then(() => {
        this._calculateMaxPoints();
        this.refreshingRequest = false;
      })
      .catch((err) => {
        const warning = this.$mdDialog.alert({
          title: 'Error',
          textContent: err,
          ok: 'Close',
        });
        this.$mdDialog.show(warning);
        this.refreshingRequest = false;
      });
  }
}

angular.module('urf3')
  .controller('challengeCtrl', ChallengeCtrl);
