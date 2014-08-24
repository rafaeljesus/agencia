'use strict';

agencia
  .factory('User', function($resource) {

    return $resource('/users/:id', { id: '@id' },
    	{
    		get: { method: "GET", params: {} },
        update: {method: "PUT", params:{} }
    	});
  });