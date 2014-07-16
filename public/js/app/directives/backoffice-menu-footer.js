agencia
  .directive('backofficeMenuFooter', function($compile, $location) {

    var template = '</div></div>';

    return {
      restrict: 'E',
      replace: true,
      link: function(scope, el, attrs) {
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
