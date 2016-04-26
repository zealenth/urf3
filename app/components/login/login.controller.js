class LoginCtrl {
  constructor($http, $state, currentUser) {
    this.$http = $http;
    this.$state = $state;
    this.currentUser = currentUser;
  }

  login() {
    if (this.password && this.user) {
      this.$http.post('/login', {
        user: this.user,
        password: this.password,
      })
        .then((resp)=> {
          if (resp.err) {
            this.err = resp.err;
          } else {
            this.currentUser.login(this.user, resp.data.token);
            const state = this.currentUser.toState || 'home';
            this.$state.go(state, this.currentUser.toParams);
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
