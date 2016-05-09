class LoginCtrl {
  constructor($http, $state, currentUser, $mdDialog) {
    this.$http = $http;
    this.$state = $state;
    this.currentUser = currentUser;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
  }

  login() {
    if (this.password && this.user) {
      this.$http.post('/login', {
        user: this.user,
        password: this.password,
      })
        .then((resp)=> {
          if (resp.data && resp.data.err) {
            const warning = this.$mdDialog.alert({
              title: 'Error',
              textContent: resp.err,
              ok: 'Close',
            });
            this.$mdDialog.show(warning);
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
