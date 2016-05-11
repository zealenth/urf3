class AppHeader {
  constructor(currentUser, $state) {
    this.currentUser = currentUser;
    this.$state = $state;
  }

  logout() {
    this.currentUser.logout();
    this.$state.go('login');
  }
}

angular.module('urf3')
    .controller('appHeaderCtrl', AppHeader);
