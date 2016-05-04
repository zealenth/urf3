describe('register controller', function() {
  var vcRecaptchaService, $httpBackend, $mdDialog, registerCtrl, recaptchaResponse,
    $rootScope, $state, currentUser;
  beforeEach(module('urf3'));

  beforeEach(function() {
    inject( function(_vcRecaptchaService_, _$httpBackend_, _$mdDialog_,
      $controller, _$state_, _$rootScope_, _currentUser_) {
      vcRecaptchaService = _vcRecaptchaService_;
      $httpBackend = _$httpBackend_;
      $mdDialog = _$mdDialog_;
      $state = _$state_;
      $rootScope = _$rootScope_;
      currentUser = _currentUser_;
      var $scope = {};
      registerCtrl = $controller('registerCtrl', { $scope: $scope });
      registerCtrl.user = 'test';
      registerCtrl.password = 'pass';
      registerCtrl.confirmPassword = 'pass';
    });
  });

  beforeEach( function() {
    spyOn($mdDialog, 'show').and.callFake( function() {} );
    spyOn(vcRecaptchaService, 'getResponse').and.callFake( function() {
      return recaptchaResponse;
    });
    currentUser.user = 'test';
    currentUser.jwt = 'test';
    recaptchaResponse = 'test';
  });
  it('expect recaptcha:getResponse to be called', function() {
    registerCtrl.register();
    expect(vcRecaptchaService.getResponse).toHaveBeenCalled();

  });

  it('Fails when recaptcha is blank', function() {
    recaptchaResponse = '';
    registerCtrl.register();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('Fails when passwords don\'t match', function() {
    registerCtrl.password = 'fake';
    registerCtrl.register();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('Fails when User is blank', function() {
    registerCtrl.user = '';
    registerCtrl.register();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('makes a http request to register', function() {
    $httpBackend.expectPOST('/register')
      .respond({jwt:'test'});

    registerCtrl.register();
    $httpBackend.flush();
    $rootScope.$apply();

    expect($state.current.name).toBe('home');
  });

  it('navigates back to the last unauthorized state', function() {
    $httpBackend.expectPOST('/register')
      .respond({jwt:'test'});
    currentUser.toState = 'login';
    registerCtrl.register();
    $httpBackend.flush();
    $rootScope.$apply();
    expect($state.current.name).toBe('login');
  });
});
