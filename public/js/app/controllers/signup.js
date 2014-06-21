'use strict';

angular
  .module('agencia')
  .controller('SignupController', function($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        var options = {
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        }
        Auth.register(options).then(function() {
          $location.path('/');
        }).catch( function(err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
          });
        });
      }
    };

  });