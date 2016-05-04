angular.module('urf3')
  .directive('challengePlayer', () =>  {
    return {
      controller: 'challengePlayerCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      scope: {
        player: '=',
      },
      bindToController: true,
      templateUrl: 'components/challenge/challenge-player/' +
      'challenge-player.tpl.html',
    };
  });
