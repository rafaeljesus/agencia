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

     $scope.simNao = [
     { value: true , text: "Sim"},
     { value: false, text: "Não"}
    ];

   $scope.loadProfile = function(){
      User.get({ id: $scope.currentUser.id }).$promise.then(function(user){      
          $scope.$emit('profileLoaded', user);          
      });
    };

    $scope.altura = {};
    
    $scope.$on('profileLoaded', function(event, profile){
      $scope.altura = profileTransformer.toAltura(profile);          
      $scope.profile = profile;
      $scope.profile.peso = ''+profile.peso;
      $scope.profile.trabalha = profileTransformer.findJsonInArray($scope.simNao, profile.trabalha);
      $scope.profile.estuda = profileTransformer.findJsonInArray($scope.simNao, profile.estuda);
      $scope.profile.tem_filhos = profileTransformer.findJsonInArray($scope.simNao, profile.tem_filhos);
      $scope.profile.possui_carro = profileTransformer.findJsonInArray($scope.simNao, profile.possui_carro);
    });

   
    $scope.updateProfile = function(){      
      var options = {
          profile: {
            id : $scope.currentUser.id,
            altura: profileTransformer.toProfile($scope.altura),
            peso: parseInt($scope.profile.peso),
            estilo_corpo: $scope.profile.estilo_corpo,
            tom_pele: $scope.profile.tom_pele,
            cor_olhos: $scope.profile.cor_olhos,
            cor_cabelo: $scope.profile.cor_cabelo,
            volume_cabelo: $scope.profile.volume_cabelo,
            trabalha: $scope.profile.trabalha.value,
            estuda: $scope.profile.estuda.value,
            tem_filhos: $scope.profile.tem_filhos.value,
            possui_carro: $scope.profile.possui_carro.value, 
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