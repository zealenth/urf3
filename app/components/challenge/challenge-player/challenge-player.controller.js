class ChallengePlayer {
  constructor() {

  }

  getWidthStyle() {
    var points = (this.player.currentPoints - this.player.startingPoints);
    points = points ? points : 1;
    var width = 80 * points / this.maxPoints;
    return {
      width: width + '%',
    };
  }
}

angular.module('urf3')
  .controller('challengePlayerCtrl', ChallengePlayer);
