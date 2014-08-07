'use strict';

agencia
  .controller('SettingsController', function($scope, Auth) {
    $scope.errors = {};
    $scope.message = undefined;

    //Cria um novo password
    $scope.resetPassword = function() {
      $scope.message = undefined;

      Auth
        .resetPassword($scope.user.oldPassword, $scope.user.newPassword )
        .then(function(user) {
          $scope.user = user;
          $scope.message = 'Sua senha foi alterada com sucesso';
        }).catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorreect password';
          $scope.message = 'Senha fornecida está incorreta';
        });
    };

    
  });
