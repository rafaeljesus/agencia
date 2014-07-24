'use strict';

agencia
  .factory('Profile', function($resource) {

   return $resource('/profile/', {}, 
    		{
          get: {method: 'GET'},
          update: {method: 'PUT'}
     		});
});  