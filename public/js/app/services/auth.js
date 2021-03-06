'use strict';

agencia
  .factory('Auth', function Auth($location, $rootScope, $sessionStorage, Session, User) {

    $rootScope.currentUser = window.user || null;

    return {

      register: function(user, cb) {
        var callback = cb || angular.noop;
        return User.save(user, function(user) {
            $rootScope.currentUser = user;
            return callback(user);
        },
        function(err) {
            return callback(err);
        }).$promise;
      },

      authenticate: function(user, cb) {
        var callback = cb || angular.noop;
        return Session.save(user, function(user) {

          if($sessionStorage){
            $sessionStorage.userLoggedIn = user;
          }    

          $rootScope.currentUser = user;
          $rootScope.$broadcast('user:loggedIn');
        
          return callback();
        }, function(err) {
          return callback(err);
        }).$promise;
      },

      logout: function(cb) {
        var callback = cb || angular.noop;
        return Session.delete(function() {
            $rootScope.currentUser = null;
            $rootScope.$broadcast('user:logout');

            if($sessionStorage){
              $sessionStorage.userLoggedIn = null;
            }    


            return callback();
          },
          function(err) {
            return callback(err);
          }).$promise;
      },

      resetPassword: function(oldPassword, newPassword, cb) {
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
        if($sessionStorage){
          user = $sessionStorage.userLoggedIn;      
        }
        
        if(!!user){
          $rootScope.currentUser = user;
          $rootScope.$broadcast('user:loggedIn');
          return true;
        }

        return false;
      }

    };
  });
