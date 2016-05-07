class JoinChallengeCtrl {
  constructor(challengeManager, $mdDialog) {
    this.challengeManager = challengeManager;
    this.challenge = this.challengeManager.getChallenge(this.id);
    this.$mdDialog = $mdDialog;
  }

  joinChallenge() {
    this.loading = this.challengeManager.joinChallenge(this.id)
      .then((challenge) => {
        if (challenge) {
          this.$state.go('home.challenge', { id: this.id });
        } else {
          const warning = this.$mdDialog.alert({
            title: 'Error',
            textContent: 'Unkown error joining challenge',
            ok: 'Close',
          });
          this.$mdDialog.show(warning);
          this.loading = false;
        }

      })
      .catch((err) => {
        this.error = err;
        const warning = this.$mdDialog.alert({
          title: 'Error',
          textContent: err,
          ok: 'Close',
        });
        this.$mdDialog.show(warning);
        this.loading = false;
      });
  }
}

angular.module('urf3')
  .controller('joinChallengeCtrl', JoinChallengeCtrl);
