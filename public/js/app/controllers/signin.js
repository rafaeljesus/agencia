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
        $scope.errors = {other: err.message || ''};
        if(err.reason === 'not_authenticated'){
            alert('Usuário ou senha estão inválidos. TODO Usar alert do bootstrap');
        }
      });
    };

  });
