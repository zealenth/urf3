'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$location', function(scope, http, location) {
    console.log(scope);
    scope.error = false;
    scope.username = "";

    scope.changeView = function(view){
      location.path(view);
    };

    scope.submit = function(){
      http({ method: 'GET', url: '/api/summoner/' + scope.username})
        .success(function(data, status, headers, config){
          if(status == 200) {
            console.log("stuff happened.");
            scope.error = false;
            scope.changeView("/view2");
          }
        })
        .error(function(data, status, headers, config){
          scope.error = true;
          console.log("stuff didn't happened.");
        });
    }
}]);
