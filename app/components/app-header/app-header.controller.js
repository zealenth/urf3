class AppHeader {
  constructor(currentUser) {
    this.currentUser = currentUser;
  }

  logout() {
    this.currentUser.logout();
  }
}

angular.module('urf3')
    .controller('appHeaderCtrl', AppHeader);
