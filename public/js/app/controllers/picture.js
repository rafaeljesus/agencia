'use strict';

agencia
  .controller('PictureController', ['$scope','User','Picture',
  function($scope, User, Picture) {
    
    $scope.setFoto = function(index){
    	$scope.foto = index;
    }

}]);

