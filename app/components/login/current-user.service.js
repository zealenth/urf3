class CurrentUser {
  constructor(localStorageService, $state) {
    this.localStorageService = localStorageService;
    this.$state = $state;
    this.user = this.localStorageService.get('user');
    this.jwt = this.localStorageService.get('jwt');
  }

  login(user, jwt) {
    this.user = user;
    this.jwt = jwt;
    this.localStorageService.set('user', user);
    this.localStorageService.set('jwt', jwt);
    const state = this.toState || 'home';
    this.$state.go(state, this.toParams);
  }
}

angular.module('urf3')
  .service('currentUser', CurrentUser);
