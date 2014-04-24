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
                $scope.portfolioService.addStock($scope.stock.name)
                    .then(function success(data) {
                            console.log("Submit success at index:"+data.index);
                        },
                        function error(data) {
                            cancelEntry(data.index);
                        }
                    );
                //console.log("Stocks now after push:",$scope.stocks);                
                
                $scope.stock.name = '';
            }
        }

        // When an unknown entry (ie. not listed on the exchange) this is called to
        // gracefully remove the row from the portfolio table
        var cancelEntry = function(index) {
            console.log("cancelEntry - index: "+index);
            fadeRow(index);
        };
                
        var fadeRow = function(index) {
            var id = "#"+$scope.rowPrefix+index;
            console.log("fader - id: '"+id+"'");
            $(id).css("color","#F44");
            $(id).fadeTo(2000, 0.0, function(animation,jumpedToEnd) {
                $scope.portfolioService.removeEntry(index);

                console.log("Stocks is now: ", $scope.stocks);
                // Force a $digest refresh as fadeTo() is a JQuery function so Angular is not aware of the data change
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