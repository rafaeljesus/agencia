'use strict';

agencia
  .controller('ProfileController', ['$scope','profileTransformer','User', 'Profile',
  function($scope, profileTransformer, User, Profile) {

    $scope.tiposFisicos = [
      "Magro", "Médio",  "Em forma",  "Pouco Acima do Peso", 
      "Muito Acima do Peso", "Musculoso", "Pequeno"
    ];

    $scope.tonsPele = [
      "Branco", "Asiático Japonês",  "Pardo/Mulato",  "Preto/Africano", 
      "Asiático Chinês", "Asiático Coreano", "Indiano",
      "Latino Hispânico", "Oriente Médio", "Outros"
    ];

    $scope.corOlhos = [
      "Azuis","Verdes","Castanhos Claros","Castanhos Escuros","Preto"
    ];

     $scope.corCabelos = [
      "Loiros","Ruivos","Castanhos Claros","Castanhos Escuros","Pretos","Grisalhos","Brancos"
    ];

    $scope.volumeCabelos = [
      "Raspado","Muito Curtos","Curtos","Médios","Longos","Calvo"
    ];


    $scope.loadProfile = function(){
      User.get({ id: $scope.currentUser.id }).$promise.then(function(user){
          $scope.altura = profileTransformer.toAltura(user);
  				$scope.profile = user;
          
  		});
    };

    $scope.updateProfile = function(){      
      var options = {
          profile: {
            id : $scope.currentUser.id,
            altura: profileTransformer.toProfile($scope.altura),
            peso: $scope.profile.peso,
            estilo_corpo: $scope.profile.estilo_corpo,
            tom_pele: $scope.profile.tom_pele,
            cor_olhos: $scope.profile.cor_olhos,
            cor_cabelo: $scope.profile.cor_cabelo,
            volume_cabelo: $scope.profile.volume_cabelo
          }
      };

      Profile.update(options).$promise.then(function(profile){
        alert('Profile atualizado com sucesso');
      });
    };

  	jQuery(document).ready(function ($) {
        $('#tabs').tab();
    });
   		
}]);