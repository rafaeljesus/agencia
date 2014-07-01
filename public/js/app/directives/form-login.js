agencia
  .directive('formLogin', function($compile) {
    var template =
      '<div>' +
        '<form class="form-inline" name="loginForm" ng-submit="authenticate()" role="form">' +
          '<div class="form-group">' +
            '<i class="glyphicon glyphicon-lock login-locker"></i>' +
          '</div>' +
          '<div class="form-group" ng-class="{error: loginForm.login.$invalid && !loginForm.login.$pristine}">' +
            '<label class="sr-only" for="login">Login</label>' +
            '<input type="text" class="form-control" name="login" required ng-model="user.loginOrEmail" placeholder="Login">' +
          '</div>' +
          '<div class="form-group" ng-class="{error: loginForm.password.$invalid && !loginForm.password.$pristine}">' +
            '<label class="sr-only" for="password">Senha</label>' +
            '<input type="password" class="form-control" name="password" required ng-model="user.password" placeholder="Senha">' +
          '</div>' +
          '<button type="submit" class="btn btn-default">Login</button>' +
          '<p>' +
            '<a href="#">Esqueci minha senha</a>' +
          '</p>' +
        '</form>' +
      '</div>';
    return {
      restrict: 'AE',
      replace: 'true',
      template: template,
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