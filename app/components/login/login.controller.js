class LoginCtrl {
  constructor($http, $state, currentUser) {
    this.$http = $http;
    this.$state = $state;
    this.currentUser = currentUser;
  }

  login() {
    if (this.password && this.username) {
      this.$http.post('/login', {
        username: this.username,
        password: this.password,
      })
        .then((resp)=> {
          if (resp.err) {
            this.err = resp.err;
          } else {
            //currentUser.login();
            this.$state.go('home');
          }
        }
      );
    }
  }

  register() {
    this.$state.go('register');
  }

}

angular.module('urf3')
    .controller('loginCtrl', LoginCtrl);
