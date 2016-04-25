class LoginCtrl {
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  login() {
    if (this.password && this.username) {
      this.$http.post( '/login', {username: this.username, password: this.password})
        .then( (resp)=> {
        if (resp.err) {

        } else {
          this.$state.go('home');
        }
      });
    }
  }

  register() {
    this.$state.go('register');
  }

}

angular.module('urf3')
    .controller('loginCtrl', LoginCtrl);
