'use strict';

angular
  .module('agencia')
  .controller('SigninController', function($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.authenticate = function() {
      Auth.authenticate($scope.user).then(function() {
        $location.path('/');
      }).catch(function(err) {
        err = err.data;
        $scope.errors.other = err.message;
      });
    };

  });