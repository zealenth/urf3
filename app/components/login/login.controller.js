class LoginCtrl {
    constructor($http) {
      this.$http = $http;
    }

    setUser(user) {
      this.user = user;
    }

}

angular.module('urf3')
    .controller('loginCtrl', LoginCtrl);
