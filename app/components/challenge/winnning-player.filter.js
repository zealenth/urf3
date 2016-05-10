angular.module('urf3')
  .filter('winningPlayer', function () {
    return function (input) {
      if (!input) {
        return input;
      }

      return input.sort((a, b) => {
        return (b.currentPoints - b.startingPoints) -
          (a.currentPoints - a.startingPoints);
      });
    };
  });
