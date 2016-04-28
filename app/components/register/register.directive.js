/**
 * @ngdoc directive
 * @name urf3.directive:register
 * @element login
 * @function
 *
 * @description
 * Allows a user to register a new account
 *
 * @example
 <example module="urf3">
 <file name="index.html">
 <register></register>
 </file>
 </example>
 */
angular.module('urf3')
  .directive('register', () => {
    return {
      controller: 'registerCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/register/register.tpl.html',
    };
  });
