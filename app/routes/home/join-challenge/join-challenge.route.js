angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('home.join', {
        url: '/join/:id',
        templateUrl: 'routes/home/join-challenge/join-challenge.tpl.html',
        controller: ($scope, $stateParams) => {
          $scope.challengeId = $stateParams.id;
        },
      });
  });
