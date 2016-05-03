angular.module('urf3')
.directive('dashboardNavPane', () =>  {
  return {
    controller: 'dashboardNavPaneCtrl',
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'components/dashboard-nav-pane/dashboard-nav-pane.tpl.html',
  };
});
