'use strict';

/* Controllers */

var stockNgControllers = angular.module('stockNg.controllers', []);

stockNgControllers.controller('portfolioController', 
    function($scope, portfolioService) {
        $scope.rowPrefix = "rp-";
        $scope.stock = {
            name: null
        };

        $scope.portfolioService = portfolioService;
        
        //$scope.stocks = new Array();//[];//X
        $scope.stocks = $scope.portfolioService.getStockList();    // portfolioService.stocks
        /*$scope.$watch(portfolioService.getStockList(), function ( stockList ) {
            console.log("Stock list changed: ", $scope.stocks);
            $scope.stocks = stockList;
        });*/

        $scope.order_by = "name";

        $scope.submit = function() {
            if ($scope.stock.name) {
                $scope.portfolioService.addStock($scope.stock.name);
                //console.log("Stocks now after push:",$scope.stocks);                
                
                $scope.stock.name = '';
            }
        }

        $scope.fader = function() {
            var that = this;
            var id = "#"+$scope.rowPrefix+this.index;
            console.log("fader - id: '"+id+"'");
            console.log("this:",this);
            $(id).css("color","#F44");
            $(id).fadeTo(2000, 0.0, function(animation,jumpedToEnd) {
                $scope.portfolioService.removeEntry(that.index);
                //$scope.stocks.splice(that.index,1);

                console.log("Stocks is now: ", $scope.stocks);
                // Force a $digest refresh as fadeTo() is a JQuery function so Angular is not aware of the data change
                $scope.$apply();    
            });
            
        };
    }
);

stockNgControllers.controller('mainController', [
    '$scope', 
    function($scope) {
        $scope.name="Ted";
    }
]);