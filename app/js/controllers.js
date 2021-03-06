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
        
        $scope.stocks = $scope.portfolioService.getStockList();    // portfolioService.stocks

        $scope.order_by = "name";

        $scope.submit = function() {
            if ($scope.stock.name) {
                $scope.portfolioService.addStock($scope.stock.name)
                    .then(function success(stock) {
                            console.log("Submit success at index:"+stock.getName());
                        },
                        function error(stock) {
                            cancelEntry(stock);
                        }
                    );                
                $scope.stock.name = '';
            }
        }

        // When an unknown entry (ie. not listed on the exchange) this is called to
        // gracefully remove the row from the portfolio table
        var cancelEntry = function(stock) {
            console.log("cancelEntry - stock: "+stock.getName());
            fadeRow(stock);
        };
                
        var fadeRow = function(stock) {
            var id = "#"+$scope.rowPrefix+stock.getName();
            console.log("fader - id: '"+id+"'");
            $(id).addClass("stockNameError");
            $(id).fadeTo(4000, 0.0, function(animation,jumpedToEnd) {
                $scope.portfolioService.removeEntry(stock);

                console.log("Stocks is now: ", $scope.stocks);
                // Force a $digest refresh; Necessary as fadeTo() is a JQuery function so Angular is not aware of the data change
                $scope.$apply();    
            });
        };
        
        $scope.fader = function() {
            var that = this;
            fadeRow(this.index);
        };

    }
);

stockNgControllers.controller('mainController', [
    '$scope', 
    function($scope) {
        $scope.name="Ted";
    }
]);