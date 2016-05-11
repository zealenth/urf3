angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
        controller: () => { },
      });
  });
