angular.module('urf3',
  [
    'urf3.templates',
    'ngRoute',
    'ui.router',
    'LocalStorageModule',
    'ngMaterial',
    'ngMessages',
    'vcRecaptcha',
  ],
  function config($httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $urlRouterProvider.otherwise('/home');
  }
);
