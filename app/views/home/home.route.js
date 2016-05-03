angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.tpl.html',
        controller: () => { },
      });
  });
