'use strict';

var agencia = angular
  .module('agencia', ['ngResource', 'ngRoute', 'ngStorage'])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MainController',
        authenticatedUsersOnly: false
      })
      .when('/settings', {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController',
        authenticatedUsersOnly: true
      })
      .when('/profile', {
        templateUrl: 'templates/my-profile.html',
        controller: 'ProfileController',
        authenticatedUsersOnly: true
      })
      .when('/contacts', {
        templateUrl: 'templates/my-contacts.html',
        controller: 'ContactController',
        authenticatedUsersOnly: true
      })
      .when('/photos', {
        templateUrl: 'templates/my-photos.html',
        controller: 'PhotoController',
        authenticatedUsersOnly: true
      })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);

    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, $sessionStorage, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.$$route.authenticatedUsersOnly && !Auth.isLoggedIn()) {
        $location.path('/login');
        return;
      }

    });
  });
