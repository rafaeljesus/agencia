'use strict';

agencia
  .controller('SigninController', function($scope, Auth, $location) {

    if(Auth.isLoggedIn()){
       $location.path('/profile');
    }

    $scope.authenticate = function() {
      var options = {
        user: {
          loginOrEmail: $scope.user.loginOrEmail,
          password: $scope.user.password
        }
      }
      Auth.authenticate(options).then(function() {
        $location.path('/profile');
      }).catch(function(err) {
        err = err.data;
        $scope.errors = err.message || '';
        alert($scope.errors);
        
      });
    };

  });
