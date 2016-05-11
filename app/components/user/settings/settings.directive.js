angular.module('urf3')
  .directive('settings', () => {
    return {
      controller: 'settingsCtrl',
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/settings/settings.tpl.html',
    };
  });
