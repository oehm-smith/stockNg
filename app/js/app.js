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

var fader1 = function() {
    console.log("fader");
    $("#portfolio").fadeOut('slow');
};

$("h1").click(function() {
    console.log("clicked it");
    fader();
});

$(".portfolioRow").click(function() {
    console.log("clicked tr");
    fader();
});
