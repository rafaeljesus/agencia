'use strict';

agencia
  .controller('SignupController', function($scope, Auth, $location) {

    $scope.register = function() {
      var options = {
        user: {
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password
        }
      }
      Auth.register(options).then(function(data) {
        $('#closeButton').click();
        $location.path('/');
      }).catch(function(err) {
        err = err.data;
      });
    };

  });
