'use strict';

agencia
  .controller('PictureController', ['$scope','User','Picture',
  function($scope, User, Picture) {
    
    $scope.firstImage = '/picture/'+$scope.currentUser.id+'/image?picture=foto1';
    $scope.secondImage = '/picture/'+$scope.currentUser.id+'/image?picture=foto2';
    $scope.thirdImage = '/picture/'+$scope.currentUser.id+'/image?picture=foto3';

}]);

