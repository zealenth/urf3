angular.module('urf3')
  .directive('joinChallenge', function () {
    return {
      controller: 'joinChallengeCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      scope: {
        id: '=',
      },
      bindToController: true,
      templateUrl: 'components/challenge/join-challenge/' +
      'join-challenge.tpl.html',
    };
  });
