angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('register', {
        url: '/register',
        template: '<register></register>',
        controller: () => { },
      });
  });
