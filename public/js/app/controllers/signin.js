'use strict';

agencia
  .controller('SigninController', function($scope, Auth, $location) {

    $scope.authenticate = function() {
      var options = {
        user: {
          loginOrEmail: $scope.user.loginOrEmail,
          password: $scope.user.password
        }
      }
      Auth.authenticate(options).then(function() {
        $location.path('/');
      }).catch(function(err) {
        err = err.data;
        $scope.errors.other = err.message;
      });
    };

  });
