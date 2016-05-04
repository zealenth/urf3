angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'routes/home/home.tpl.html',
        controller: () => { },
      });
  });
