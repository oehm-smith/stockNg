'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('stockNg.services', [])
    .value('version', '0.1')
    .factory('portfolioService', function($http) {
        var stocks = [];
        
                
        var getStockList = function() {
            return stocks;
        };
        var setStockList = function(newStocks) {
            stocks = newStocks;
        };
        var addStock = function(stockSymbol) {
            var newStock = stock({name:stockSymbol});
            stocks.push(newStock);
        };
        
        // TEST
        addStock('XYZ');
        
        return {
            getStockList: getStockList,
            setStockList: setStockList,
            addStock: addStock
        };
    });
