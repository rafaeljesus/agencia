agencia
  .directive('backofficeMenu', function($compile, $location) {

    return {
      restrict: 'E',
      link: function(scope, el, attrs) {
        scope.$on('user:loggedIn', function() {
          el.html(attrs.template);
          $compile(el.html())(scope);
        });
        scope.$on('user:logout', function() {
          el.remove();
          $location.path('/');          
        });
      }
    };
});
