'use strict';

angular
  .module('agencia')
  .factory('Auth', function Auth($location, $rootScope, Session, User) {

    $rootScope.currentUser = window.user || null;

    return {

      authenticate: function(user, _callback) {
        var callback = _callback || angular.noop
        , options = {
          email: user.email,
          password: user.password
        };
        return Session.save(options, function(user) {
          $rootScope.currentUser = user;
          return callback();
        }, function(err) {
          return callback(err);
        }).$promise;
      },

      logout: function(_callback) {
        var callback = _callback || angular.noop;
        return Session.delete(function() {
            $rootScope.currentUser = null;
            return callback();
          },
          function(err) {
            return callback(err);
          }).$promise;
      },

      signup: function(user, _callback) {
        var callback = _callback || angular.noop;
        return User.save(user, function(user) {
            $rootScope.currentUser = user;
            return callback(user);
          },
          function(err) {
            return callback(err);
          }).$promise;
      },

      changePassword: function(oldPassword, newPassword, _callback) {
        var callback = _callback || angular.noop
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