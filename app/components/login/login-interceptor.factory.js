angular.module('urf3')
  .factory('AuthInterceptor', (currentUser) => {
    function addToken(config) {
      var token = currentUser.jwt;
      if (token) {
        config = config || {};
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    }

    return {
      request: addToken,
    };
  });
