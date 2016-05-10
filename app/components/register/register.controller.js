class RegisterCtrl {
  constructor($http, $mdDialog, $state, currentUser, vcRecaptchaService) {
    this.$http = $http;
    this.$mdDialog = $mdDialog;
    this.vcRecaptchaService = vcRecaptchaService;
    this.currentUser = currentUser;
    this.$state = $state;
    this.recaptchaKey = '6LesVx4TAAAAAHpmPVwUiOENoRe042MHiCsfgd5z';
  }

  register() {
    if (this.vcRecaptchaService.getResponse() === '') {
      const warning = this.$mdDialog.alert({
        title: 'Recaptcha',
        textContent: 'Please fill out the recaptcha',
        ok: 'Close',
      });
      return this.$mdDialog.show(warning);
    } else if (this.password !== this.confirmPassword) {
      const warning = this.$mdDialog.alert({
        title: 'Passwords',
        textContent: 'Your passwordwords do not match',
        ok: 'Close',
      });
      return this.$mdDialog.show(warning);
    } else if (!this.user) {
      const warning = this.$mdDialog.alert({
        title: 'User',
        textContent: 'Username is required',
        ok: 'Close',
      });
      return this.$mdDialog.show(warning);
    } else if (!this.lolAccount) {
      const warning = this.$mdDialog.alert({
        title: 'LoL Account',
        textContent: 'A League of Legends account is required',
        ok: 'Close',
      });

      return this.$mdDialog.show(warning);
    }

    this.$http.post('/register', {
      user: this.user,
      password: this.password,
      email: this.email,
      lolAccount: this.lolAccount,
      recaptcha: this.vcRecaptchaService.getResponse(),
    }).then((resp) => {
      const data = resp.data;
      if (data.error) {
        const warning = this.$mdDialog.alert({
          title: 'Error',
          textContent: data.error,
          ok: 'Close',
        });
        return this.$mdDialog.show(warning);
      }

      this.currentUser.login(this.user, data.token);
      const state = this.currentUser.toState || 'home';
      this.$state.go(state, this.currentUser.toParams);
    });
  }
}

angular.module('urf3')
  .controller('registerCtrl', RegisterCtrl);
