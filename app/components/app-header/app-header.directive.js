angular.module('urf3')
    .directive('appHeader', () => {
      return {
        controller: 'appHeaderCtrl',
        restrict: 'E',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'components/app-header/app-header.tpl.html',
      };
    });
