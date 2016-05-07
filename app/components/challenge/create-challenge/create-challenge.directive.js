angular.module('urf3')
  .directive('createChallenge', function () {
    return {
      controller: 'createChallengeCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/challenge/create-challenge/' +
      'create-challenge.tpl.html',
    };
  });
