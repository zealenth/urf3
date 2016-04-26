class CurrentUser {
  constructor(localStorageService) {
    this.localStorageService = localStorageService;
    this.user = this.localStorageService.get('user');
    this.jwt = this.localStorageService.get('jwt');
  }

  login(user, jwt) {
    this.user = user;
    this.jwt = jwt;
    this.localStorageService.set('user', user);
    this.localStorageService.set('jwt', jwt);
  }
}

angular.module('urf3')
  .service('currentUser', CurrentUser);
