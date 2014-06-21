'use strict';

angular
  .module('agencia')
  .factory('Session', function($resource) {
    return $resource('/session/');
  });