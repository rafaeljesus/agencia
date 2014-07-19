'use strict';

agencia
  .controller('ProfileController', function($scope, Auth, $location, User ) {

  	User.get({ id: $scope.currentUser.id }, function(user){
  			$scope.profile = user;
  	});
  		
  });