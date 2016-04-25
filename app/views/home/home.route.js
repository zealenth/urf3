angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('home', {
        url: '/home',
        template: '<md-content>HOME!</md-content>',
        controller: () => { },
      });
  });
