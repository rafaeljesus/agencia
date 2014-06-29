'use strict';

angular
  .module('agencia')
  .controller('SigninController', function($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.authenticate = function() {
      var options = {
        email: $scope.user.email,
        password: $scope.user.password
      }
      Auth.authenticate(options).then(function(err) {
        $location.path('/');
      }).catch(function(err) {
        err = err.data;
        $scope.errors.other = err.message;
      });
    };

  });