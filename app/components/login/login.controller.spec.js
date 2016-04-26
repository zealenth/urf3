describe('login controller', function() {
  var $controller, $httpBackend, $rootScope, $state, loginCtrl;

  beforeEach(module('urf3'));

  beforeEach(function() {
    inject(function(_$controller_, _$httpBackend_, _$state_, _$rootScope_) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    var $scope = {};
    loginCtrl = $controller('loginCtrl', { $scope: $scope });
  });

  it('login does not make a rquest when password/username are not set', function() {
    loginCtrl.login();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('login makes a request when password/username are set', function() {
    $httpBackend.expectPOST( '/login' )
      .respond({jwt: 'a'});
    loginCtrl.user='user';
    loginCtrl.password='pwd';
    loginCtrl.login();
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('register takes you to the register view', function() {
    loginCtrl.register();
    $rootScope.$digest();
    expect($state.current.name).toBe('register');
  });

});