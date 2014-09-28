'use strict';

agencia
  .controller('PictureController', ['$scope','User','Picture',
  function($scope, User, Picture) {
    
    $scope.firstImage = '/picture/'+$scope.currentUser.id+'/image?photoParam=foto1';
    $scope.secondImage = '/picture/'+$scope.currentUser.id+'/image?photoParam=foto2';
    $scope.thirdImage = '/picture/'+$scope.currentUser.id+'/image?photoParam=foto3';

}]);

