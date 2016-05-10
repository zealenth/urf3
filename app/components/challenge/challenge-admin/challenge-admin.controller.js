class ChallengeAdminCtrl {
  constructor(challengeManager, currentUser) {
    this.challenge = challengeManager.getChallenge(this.id);
    this.currentUser = currentUser;
  }

  invitePlayer() {
    if (!this.invitee) {
      return;
    }

    if (!this.challenge.admin) {
      this.challenge.admin = {};
    }

    if (!this.challenge.admin.invites) {
      this.challenge.admin.invites = [];
    }

    this.challenge.admin.invites.push(this.invitee);

    //TODO: actually save it...
    this.invitee = '';
  }

  getJoinLink() {
    return window.location.hostname + '/home/join/' + this.challenge._id;
  }

}

angular.module('urf3')
  .controller('challengeAdminCtrl', ChallengeAdminCtrl);
