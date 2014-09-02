'use strict';

agencia
  .factory('Picture', function($resource) {

   return $resource('/picture/:action/:id', {action: "@action", id: "@id"},  
    		{
    			get: {method: 'GET', params: {} },
    			uploadFirstImage: {method: 'POST', params: {action: 'upload', id: 'firstImage'} }
     		}
   );
});  