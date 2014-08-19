'use strict';

agencia
  .factory('Contact', function($resource) {

   return $resource('/contact/:action/:id', {action: "@action", id: "@id"},  
    		{
      	  get: {method: 'GET', params: {} },
      	  update: {method: 'PUT', params: {}},
      	  checkMail: {method: 'GET', params: {action: 'check', id: 'mail' }}
     		}
   );
});  