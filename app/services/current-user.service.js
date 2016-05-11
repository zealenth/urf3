class CurrentUser {
  constructor(localStorageService, $state) {
    this.localStorageService = localStorageService;
    this.user = this.localStorageService.get('user');
    this.jwt = this.localStorageService.get('jwt');
    this.$state = $state;
  }

  login(user, jwt) {
    this.user = user;
    this.jwt = jwt;
    this.localStorageService.set('user', user);
    this.localStorageService.set('jwt', jwt);
  }

  logout() {
    this.localStorageService.remove('user');
    this.localStorageService.remove('jwt');
    this.user = null;
    this.jwt = null;
    this.$state.go('login');
  }
}

angular.module('urf3')
  .service('currentUser', CurrentUser);
