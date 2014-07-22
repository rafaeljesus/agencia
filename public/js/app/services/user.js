'use strict';

agencia
  .factory('User', function($resource) {

    return $resource('/users/:id', { id: '@id' },
    	{
    		get: { method: "GET", params: { id: 0 } },
        update: {method: "PUT", params:{} }
    	});
  });