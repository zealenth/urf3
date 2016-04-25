/**
 * @ngdoc directive
 * @name urf3.directive:login
 * @element login
 * @function
 *
 * @description
 * Allows a user to login or register.
 *
 * @example
 <example module="urf3">
 <file name="index.html">
 <login></login>
 </file>
 </example>
 */
angular.module('urf3')
    .directive('login', () => {
      return {
        controller: 'loginCtrl',
        restrict: 'E',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'app/components/login/login.tpl.html',
      };
    });
