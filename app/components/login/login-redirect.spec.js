describe('login-redirect', function () {
  var $rootScope, $state, currentUser;

  beforeEach(module('urf3'));

  beforeEach(inject(function (_currentUser_,_$state_,_$rootScope_) {
    currentUser = _currentUser_;
    $state = _$state_;
    $rootScope = _$rootScope_;
  }));

  it('should redirect you to login when not logged in', function () {
    $state.go('home');
    $rootScope.$apply();
    expect($state.current.name).toBe('login');
  });

  it('should redirect you to login when not logged in', function () {
    currentUser.user = 'test';
    currentUser.jwt = 'jwt';
    $state.go('home');
    $rootScope.$apply();
    expect($state.current.name).toBe('home');
  });
});