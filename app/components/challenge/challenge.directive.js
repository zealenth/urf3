angular.module('urf3')
  .directive('challenge', () =>  {
    return {
      controller: 'challengeCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/challenge/challenge.tpl.html',
    };
  });
