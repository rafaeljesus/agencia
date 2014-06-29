'use strict';

angular
  .module('agencia')
  .factory('Auth', function Auth($location, $rootScope, Session, User) {

    var emailPattern = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

    $rootScope.currentUser = window.user || null;

    return {

      register: function(user, cb) {
        var callback = cb || angular.noop;
        if (!emailPattern.test(user.email))
          return callback({ error: 'Invalid email' });
        return User.save(user, function(user) {
            $rootScope.currentUser = user;
            return callback(null, user);
          },
          function(err) {
            return callback(err);
          }).$promise;
      },

      authenticate: function(user, cb) {
        var callback = cb || angular.noop;
        if (!emailPattern.test(user.email))
          return callback({ error: 'Invalid email' });
        return Session.save(user, function(user) {
          $rootScope.currentUser = user;
          return callback(null);
        }, function(err) {
          return callback(err);
        }).$promise;
      },

      logout: function(cb) {
        var callback = cb || angular.noop;
        return Session.delete(function() {
            $rootScope.currentUser = null;
            return callback();
          },
          function(err) {
            return callback(err);
          }).$promise;
      },

      changePassword: function(oldPassword, newPassword, cb) {
        var callback = cb || angular.noop
        , options = {
          oldPassword: oldPassword,
          newPassword: newPassword
        };

        return User.update(options, function(user) {
          return callback(user);
        }, function(err) {
          return callback(err);
        }).$promise;
      },

      currentUser: function() {
        return User.get();
      },

      isLoggedIn: function() {
        var user = $rootScope.currentUser;
        return !!user;
      }

    };
  });