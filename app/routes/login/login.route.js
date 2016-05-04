angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
        controller: () => { },
      });
  });
