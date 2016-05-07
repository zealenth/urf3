class CreateChallengeCtrl {
  constructor(challengeManager, $state) {
    this.challengeManager = challengeManager;
    this.$state = $state;
  }

  create() {
    this.loading = this.challengeManager.createChallenge({
      name: this.name,
      public: !!this.public,
    })
      .then((challenge) => {
        this.$state.go('home.challenge', { id: challenge._id });
      })
      .catch((err) => {
        this.error = err;
        this.loading = false;
      });
  }
}

angular.module('urf3')
  .controller('createChallengeCtrl', CreateChallengeCtrl);
