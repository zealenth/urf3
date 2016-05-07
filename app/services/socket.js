angular.module('urf3')
  .factory('socket', ['$rootScope',
  function ($rootScope) {
    var socket = io.connect();
    var angularSocket = {
      disconnect: function () {
        socket.disconnect();
      },

      reconnect: function () {
        socket.reconnect();
      },

      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },

      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },

      isConnected: true,
    };

    angularSocket.on('disconnect', function () {
      angularSocket.isConnected = false;
    });

    angularSocket.on('reconnect', function () {
      angularSocket.isConnected = true;
    });

    return angularSocket;
  },
]);
