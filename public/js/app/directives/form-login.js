agencia
  .directive('formLogin', function($compile) {


    return {
      restrict: 'AE',
      templateUrl: 'templates/form-login.html',
      link: function(scope, el, attrs) {
        scope.$on('user:loggedIn', function() {
          el.remove();
        });
        scope.$on('user:logout', function() {
          el.html(template);
          $compile(el.html())(scope);
        });
      }
    };
});
