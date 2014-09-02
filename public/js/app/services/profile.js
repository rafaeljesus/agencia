'use strict';

agencia
  .factory('Profile', function($resource) {

   return $resource('/profile/:action', {action: "@action"}, 
    		{
          get: {method: 'GET', params: {}},
          update: {method: 'PUT', params: {}},
          changePassword: {method: 'PUT', params: {action: 'changePassword'}},
          checkMail: {method: 'GET', params: {action: 'checkMail'}},
          uploadFirstImage: {method: 'POST', params: {action :'uploadFirstImage'}}
     		}
   );
});  