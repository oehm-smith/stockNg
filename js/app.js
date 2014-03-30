'use strict';

/* Application Module */

var stockNgApp = angular.module('stockNgApp', [
    'ngRoute',
    'stockNgControllers'
]);

stockNgApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', 
                {templateUrl: 'views/main.html'})
            .when('/portfolio', 
                {templateUrl: 'views/portfolio.html'})
            .otherwise({redirectTo: '/'});
        }]);
