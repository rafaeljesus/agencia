'use strict';

agencia
  .controller('PictureController', ['$scope','User','Picture',
  function($scope, User, Picture) {
    
		$scope.loadPhotos = function(){
    	 Picture.get({ id: $scope.currentUser.id }).$promise.then(function(picture){      
          $scope.picture = picture;          
      });
    };

}]);

