class RegisterCtrl {
  constructor($http) {
    this.$http = $http;
    this.recaptchaKey = '6LesVx4TAAAAAHpmPVwUiOENoRe042MHiCsfgd5z';
  }

  register() {
    //register
  }
}

angular.module('urf3')
  .controller('registerCtrl', RegisterCtrl);
