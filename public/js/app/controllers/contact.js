'use strict';

agencia
  .controller('ContactController', ['$scope','User','Contact',
  function($scope, User, Contact) {
    

   User.get({id: $scope.currentUser.id}).$promise.then(function(user){
	 $scope.user = user;
	 $scope.emailProfile = user.email;
   });
    
    $scope.loadContact = function(){
    	 Contact.get({ id: $scope.currentUser.id }).$promise.then(function(contact){      
          $scope.contact = contact;          
      });
    };

     $scope.saveContact = function(){
       var options = {
          contact: {
            id_cliente: $scope.user.id,
            tel_residencial: $scope.contact.tel_residencial,
            tel_celular: $scope.contact.tel_celular,
            tel_trabalho: $scope.contact.tel_trabalho,
            e_mail_contato: $scope.contact.e_mail_contato,
            skype: $scope.contact.skype,
            id: $scope.contact.id            
          }
       };

       Contact.update(options).$promise.then(function(contact){
          $scope.contact = contact;
          alert('Dados de contato atualizados com sucesso');
          
        }, function(err){

          if(err.data && err.data.message){
            alert(err.data.message);
          } else {
            alert('Erro ao atualizar dados de contato.');
          }
          
      });
    };

    
    $scope.checkMailInUse = function(){
      $scope.emailContactInUse = '';
      if(!$scope.contact.e_mail_contato ){
        return;
      }

      var options = {
         e_mail_contato: $scope.contact.e_mail_contato
      };

      Contact.checkMail(options).
        $promise.then(function(contact){
          //do nothing
        }, function(err){          
          $scope.emailContactInUse =  err.data.message;
        });
    };


}]);

