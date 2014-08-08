'use strict';

agencia
  .controller('ProfileController', ['$scope','profileTransformer','User', 'Profile',
  function($scope, profileTransformer, User, Profile) {
    
    $scope.isFormValid = true;
    
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

    $scope.moraComQuem = [
      { value: "Moro sozinho(a)", text: "Sozinho(a)"},
      { value: "Moro com minha família", text: "Família"},
      { value: "Moro com amigos(as)", text: "Amigos"},
    ];

    $scope.religiao = [
      'Cristão - Católico', 'Judáica', 'Espírita', 'Budista', 'Evangélico', 'Agnóstico', 'Ateu', 
      'Espiritual, mas sem religião', 'Adventista','Cristão - Protestante', 'Cristão - Outros', 
      'Hindu', 'Muçulmano', 'Outros'
    ];

    $scope.escolaridade = [
      'Até 2o grau', 'Superior cursando', 'Técnico profissionalizante', 
      'Superior completo', 'Superior incompleto', 'Pós-graduado', 
      'PHD/pós doutorado'
    ];

    $scope.signo = [
      'Áries','Touro','Gêmeos','Câncer','Leão','Virgem',
      'Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'
    ];

    $scope.estiloMusical = [
      'Clássica','New Age','MPB','Pagode','Jazz','Axé','Samba','Rock progressivo','Sertanejo',
      'Ópera','Dance','Pop','Punk','Pop','Bossa nova', 'Blues','Reggae','Heavy metal','Techno',
      'Rock and Roll','Funk'
    ];

    $scope.visual = [
      'Sofisticado','Fashion','Sensual','Descontraído','Elegante','Casual',
      'Esportivo','Hippie','Clássico Formal','Clubber','Punk'
    ];

    $scope.viajar = [
      'Praias','Campos','Montanhas','Ecológicas','Acampamentos','Culturais','Românticas'
    ];

    $scope.bebidaAlcoolica = [
      'Não Bebo','Bebo socialmente','Bebo regularmente'
    ];

    $scope.comoAtua = [
      { value: "0", text: "Passivo"},
      { value: "1", text: "Ativo"},
      { value: "2", text: "Ambos"},
    ];

    $scope.sexo = [
      { value: "0", text: "Feminino"},
      { value: "1", text: "Masculino"},
      { value: "3", text: "Transsexual/Travesti"},
    ];

   $scope.loadProfile = function(){
      User.get({ id: $scope.currentUser.id }).$promise.then(function(user){      
          $scope.$emit('profileLoaded', user);          
      });
    };

    $scope.altura = {};

    $scope.displayChangePassword = false;
    
    $scope.$on('profileLoaded', function(event, profile){
      $scope.altura = profileTransformer.toAltura(profile);          
      $scope.profile = profile;
      $scope.profile.peso = ''+profile.peso;
      $scope.profile.trabalha = profileTransformer.findJsonInArray($scope.simNao, profile.trabalha);
      $scope.profile.estuda = profileTransformer.findJsonInArray($scope.simNao, profile.estuda);
      $scope.profile.tem_filhos = profileTransformer.findJsonInArray($scope.simNao, profile.tem_filhos);
      $scope.profile.possui_carro = profileTransformer.findJsonInArray($scope.simNao, profile.possui_carro);
      $scope.profile.como_mora = profileTransformer.findJsonInArray($scope.moraComQuem, profile.como_mora);
      $scope.profile.gosta_tv = profileTransformer.findJsonInArray($scope.simNao, profile.gosta_tv);
      $scope.profile.gosta_ler = profileTransformer.findJsonInArray($scope.simNao, profile.gosta_ler);
      $scope.profile.fuma = profileTransformer.findJsonInArray($scope.simNao, profile.fuma);
      $scope.profile.pratica_exercicio = profileTransformer.findJsonInArray($scope.simNao, profile.pratica_exercicio);
      $scope.profile.sexo = profileTransformer.findJsonInArray($scope.sexo, profile.sexo);
      $scope.profile.como_atua = profileTransformer.findJsonInArray($scope.comoAtua, profile.como_atua);
      $scope.profile.idade = ''+profile.idade;
      $scope.profile.compromissado = profileTransformer.findJsonInArray($scope.simNao, profile.compromissado);
      
    });

   
    $scope.updateProfile = function(){ 
      
      $scope.isFormValid = $scope.profileForm.$valid;
      if(!$scope.isFormValid) return false;
      
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
            como_mora: $scope.profile.como_mora.value,
            religiao: $scope.profile.religiao,
            formacao_academica: $scope.profile.formacao_academica,
            signo: $scope.profile.signo,
            gosta_tv: $scope.profile.gosta_tv.value,
            gosta_ler: $scope.profile.gosta_ler.value,
            fuma: $scope.profile.fuma.value,
            estilo_musical1: $scope.profile.estilo_musical1,
            estilo_musical2: $scope.profile.estilo_musical2,
            estilo_musical3: $scope.profile.estilo_musical3,
            estilo_musical4: $scope.profile.estilo_musical4,
            visual: $scope.profile.visual,
            viagem1: $scope.profile.viagem1,
            viagem2: $scope.profile.viagem2,
            pratica_exercicio: $scope.profile.pratica_exercicio.value,
            bebida: $scope.profile.bebida,
            email: $scope.profile.email, 
            sexo: parseInt($scope.profile.sexo.value),
            primeiro_nome: $scope.profile.primeiro_nome,
            sobrenome: $scope.profile.sobrenome,
            idade: parseInt($scope.profile.idade),
            como_atua: parseInt($scope.profile.como_atua.value),
            compromissado: $scope.profile.compromissado.value,
            cidade: $scope.regiao.name,//todo split "," e pegar pos[0] ver itaipava por exemplo
            estado: $scope.regiao.region,
            pais: $scope.regiao.country_code
          }
      };

      Profile.update(options).$promise.then(function(profile){
        alert('Profile atualizado com sucesso');
      }, function(err){
        alert('Error: '+err);
      });
    };
    //end of update




    //altera validando com o antigo
    $scope.changePassword = function(){
      $scope.message = undefined;
      if($scope.newPassword && $scope.oldPassword && $scope.confirmPassword){
          if($scope.newPassword === $scope.confirmPassword){
            
            var options = {
                profile : {
                  oldPassword: $scope.oldPassword, 
                  newPassword: $scope.newPassword, 
                  id: $scope.currentUser.id
                }
            };

            return Profile.changePassword(options)
                  .then(function(user) {
                    $scope.user = user;
                    $scope.message = 'Sua senha foi alterada com sucesso';
                  }).catch(function() {
                    $scope.message = 'Senha fornecida está incorreta';
                  });
            }

          $scope.message = 'A senha nova deve ser idêntica a sua confirmação';
          return false;
      } 
      $scope.message = 'Forneça os valores para todos os campos corretamente';
      return false;
    };//end of changePasswordConfirming




  	jQuery(document).ready(function ($) {
        $('#tabs').tab();
    });

    $('a[data-toggle="tab"]').on('shown', function (e) {
      error.target // activated tab
      e.relatedTarget // previous tab
    });
   		
}]);

