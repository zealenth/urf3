angular.module('urf3')
  .run(['$state', 'socket', '$rootScope', 'currentUser',
    function ($state, socket, $rootScope, currentUser) {
    var bAuthenticated = false;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      if (!bAuthenticated && toState.name !== 'login' &&
        toState.name !== 'register') {
        if (!currentUser.user) {
          event.preventDefault();
          currentUser.toState = toState.name;
          currentUser.toParams = toParams;
          return $state.go('login');
        } else {
          socket.emit('login', {
            user: currentUser.user,
            jwt: currentUser.jwt,
          });
          socket.on('reconnect', function () {
            socket.emit('login', {
              user: currentUser.user,
              jwt: currentUser.jwt,
            });
          });
        }

        bAuthenticated = true;
      }
    });
  },
]);
