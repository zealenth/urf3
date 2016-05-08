angular.module('urf3')
  .directive('ngEnter', () => {
    return (scope, element, attrs) => {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13 && !event.shiftKey) {
          scope.$apply(() => {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }

      });
    };
  });
