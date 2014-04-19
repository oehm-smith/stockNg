'use strict';

// Declare app level module which depends on filters, and services
var module = angular.module('stockNgApp', [
  'ngRoute',
  'stockNg.filters',
  'stockNg.services',
  'stockNg.directives',
  'stockNg.controllers'
]);
module.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html'});
  $routeProvider.when('/portfolio', {templateUrl: 'partials/portfolio.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

