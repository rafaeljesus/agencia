'use strict';

agencia
  .factory('Session', function($resource) {
    return $resource('/session/');
  });