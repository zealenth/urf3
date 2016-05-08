describe('current-user service', function() {
  describe('login', function() {
    var currentUser, localStorageService;

    beforeEach(module('urf3'));

    beforeEach( function() {
      inject( function(_currentUser_, _localStorageService_) {
        currentUser = _currentUser_;
        localStorageService = _localStorageService_;
      });
    });

    it('login should set the user and jwt', function() {
      currentUser.login('testUser','testJwt');
      expect(currentUser.user).toBe('testUser');
      expect(currentUser.jwt).toBe('testJwt');
      expect(localStorageService.get('user')).toBe('testUser');
      expect(localStorageService.get('jwt')).toBe('testJwt');
    });

    it('pulls in initial saved values from local storage', function () {
      expect(currentUser.user).toBe('testUser');
      expect(currentUser.jwt).toBe('testJwt');
      localStorageService.remove('user');
      localStorageService.remove('jwt');
    });
  });
});