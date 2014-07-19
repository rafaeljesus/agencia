'use strict';

agencia
  .controller('ProfileController', function($scope, Auth, $location, User ) {

  	$scope.loadProfile = (function(){
  		User.get({ id: $scope.currentUser.id }, function(user){
  				$scope.profile = user;
  		});
  });

  	jQuery(document).ready(function ($) {
        $('#tabs').tab();
    });
  		
  });