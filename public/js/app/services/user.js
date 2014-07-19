'use strict';

agencia
  .factory('User', function($resource) {

    return $resource('/users/:id', { id: '@id' },
    	{
    		getAll: { method: "GET", params: {} },
        get: { method: "GET", params: { id: 0 } },
        update: {method: "PUT"}
    	});
  });