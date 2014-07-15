agencia
  .directive('backofficeMenuFooter', function($compile, $location) {

    return {
      restrict: 'E',
      templateUrl: 'templates/backoffice-menu-footer.html',
      link: function(scope, el, attrs) {
        el.remove();
                scope.$on('user:loggedIn', function() {
          el.html(template);
          $compile(el.html())(scope);
        });
        scope.$on('user:logout', function() {
          el.remove();
          $location.path('/');          
        });
      }
    };
});
s