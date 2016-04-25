angular.module('urf3')
  .config(($routeProvider, $stateProvider) => {
    $stateProvider
      .state('register', {
        url: '/register',
        template: '<register></register>',
        controller: () => { },
      });
  });
