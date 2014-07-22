'use strict';

agencia
  .controller('ProfileController', function($scope, $location, User, Profile) {

    var transformer = null;

  	$scope.loadProfile = function(){
  		User.get({ id: $scope.currentUser.id }, function(user){
  				$scope.profile = user;
          transformer = new AGENCIA.TransformFields($scope);
          transformer.setAltura();
          transformer.setPeso();
  		});
    };

    $scope.updateProfile = function(){      
      transformer = new AGENCIA.TransformFields($scope);
      var options = {
        profile: {
          id: $scope.currentUser.id,
          altura: transformer.getAltura(),
          peso: transformer.getPeso(),
          estilo_corpo: $scope.profile.estilo_corpo
        }
      };
      Profile.update(options, function(profile){
        alert('Profile atualizado com sucesso');
      });
    };

  	jQuery(document).ready(function ($) {
        $('#tabs').tab();
    });

   		
});