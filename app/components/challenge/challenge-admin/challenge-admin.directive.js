angular.module('urf3')
  .directive('challengeAdmin', () =>  {
    return {
      controller: 'challengeAdminCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      scope: {
        id: '=',
      },
      bindToController: true,
      templateUrl: 'components/challenge/challenge-admin/' +
      'challenge-admin.tpl.html',
    };
  });
