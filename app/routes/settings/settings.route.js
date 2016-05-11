angular.module('urf3')
  .config(($stateProvider) => {
    $stateProvider
      .state('settings', {
        url: '/user/settings',
        template: '<user-settings></user-settings>',
        controller: () => { },
      });
  });
