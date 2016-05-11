angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('home.challenge', {
        url: '/challenge/:id',
        templateUrl: 'routes/home/challenge/challenge.tpl.html',
        controller: ($scope, $stateParams) => {
          $scope.challengeId = $stateParams.id;
        },
      });
  });
