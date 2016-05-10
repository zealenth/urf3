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
  function config($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider.otherwise( '/home' );
  }
);
