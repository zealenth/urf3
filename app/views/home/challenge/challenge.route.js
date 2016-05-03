angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('home.challenge', {
        url: '/:id',
        templateUrl: 'views/home/challenge/challenge.tpl.html',
        controller: ($scope, $stateParams) => {
          $scope.challengeId = $stateParams.id;
        },
      });
  });
