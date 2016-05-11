angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'routes/home/home.tpl.html',
        controller: () => { },
      });
  });
