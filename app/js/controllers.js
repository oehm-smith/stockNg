'use strict';

/* Controllers */

var stockNgControllers = angular.module('stockNg.controllers', []);

stockNgControllers.controller('portfolioController', 
    function($scope, portfolioService) {

      $scope.stock = {
        name: null
      };

      //$scope.stocks = [];
      $scope.stocks = portfolioService.getStockList();
      $scope.order_by = "name";

      $scope.submit = function() {
        if ($scope.stock.name) {
            portfolioService.addStock($scope.stock.name);
          //$scope.stocks.push({name: $scope.stock.name});
            $scope.stock.name = '';
        }
      };
    }
);

stockNgControllers.controller('mainController', [
    '$scope', 
    function($scope) {
        $scope.name="Ted";
    }
]);