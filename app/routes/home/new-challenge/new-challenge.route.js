angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('home.newChallenge', {
        url: '/newChallenge',
        templateUrl: 'routes/home/new-challenge/new-challenge.tpl.html',
        controller: ($scope, $stateParams) => {
          $scope.challengeId = $stateParams.id;
        },
      });
  });
