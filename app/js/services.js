'use strict';

/* Services */


var stockNgServices = angular.module('stockNg.services', []);


stockNgServices.value('version', '0.1');


stockNgServices.factory('portfolioService', function(stockLookupService) {
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
            stockLookupService.lookup(newStock)
                .then(function(data) {
                    console.log("Lookup success in AddStock - data: ", data);
                    newStock.setName(data.data.Symbol);
                    newStock.setValue(data.data.Close);
                    newStock.setLastDate(data.dateCreated);
                });
            /*slsPromise.success(function(data, status, headers, config) {
                console.log("Lookup success in AddStock - data: ", data);
            });
            lookupPromise.error(function(data, status, headers, config) {
                console.log("Lookup failure in AddStock - status: ", status, ", data: ", data);
            });*/
        };
        
        return {
            getStockList: getStockList,
            setStockList: setStockList,
            addStock: addStock
        };
    });

stockNgServices.factory('stockLookupService', function($http, $q, utilityService) {

/*var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
            var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
            var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;*/

    var urlBase = "http://query.yahooapis.com/v1/public/yql?q=";
    var queryTemplate = 'select * from yahoo.finance.historicaldata where symbol = "%symbol%" and startDate = "%startDate%" and endDate = "%endDate%"';
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
    var exchange = "AX";
    //var symbolArg="s";
    
    var lookup = function(stockObj) {
        //var lookupUrl=urlBase+"&"+symbolArg+"="+stockObj.getName()+"."+exchange;
        /*var lookupUrl = "http://mhnystatic.s3.amazonaws.com/angulartest/list.html";
        console.log("Lookup symbol: ", stockObj.getName(), "Lookup url: "+lookupUrl);
        var lookupPromise = $http({
            method: "GET",
            url: lookupUrl,
            headers: {
                "Accept":"" star slash star
            }
        });
        lookupPromise.success(function(data, status, headers, config) {
            console.log("Lookup success - data: ", data);
        });
        lookupPromise.error(function(data, status, headers, config) {
            console.log("Lookup failure - status: ", status, ", data: ", data);
        });
        */
        var symbol=stockObj.getName()+"."+exchange;
        // Dates - need to be in the form '2014-04-12T07:08:04Z'
        var endDate = Date.today();
            // take 7 days to make sure I get the last market close day (ie. there might be a string of public holidays)
        var startDate=Date.today().add(-7).days();
        var endDateF = endDate.toString("yyyy-MM-ddTHH:mm:ssZ");
        var startDateF = startDate.toString("yyyy-MM-ddTHH:mm:ssZ");
        console.log("Start date: ",startDateF,", end date: ", endDateF);
        
        var deferred = $q.defer();
        //return;// deferred.promise;
        
        // /var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
// REVERT THIS REVERT THIS REVERT THIS REVERT THIS REVERT THIS REVERT THIS REVERT THIS 
        var query = utilityService.template(queryTemplate,{symbol:symbol, startDate:startDateF, endDate:endDateF});
        //var query = 'select * from yahoo.finance.historicaldata where symbol = "'+symbol+'" and startDate = "'+startDateF+'" and endDate = "'+endDateF'"';
        //var query = 'select * from yahoo.finance.historicaldata where symbol = "CBA.AX" and startDate = "2014-04-12T07:08:04Z" and endDate = "2014-04-19T07:08:04Z"';

        //.'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + startF + '" and endDate = "' + endF + '"';
        //var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;
        var urlNoEncode = urlBase + query + format;
        var urlEncode = urlBase + encodeURIComponent(query) + format;

        console.log("Url (unencoded version):",urlNoEncode);
        console.log("Url (encoded version):",urlEncode);

        var lookupPromise = $http.jsonp(urlEncode);
        
        lookupPromise.success(function(data, status, headers, config) {
            console.log("Lookup success - count: ", data.query.count, ", data: ", data);
            if (data.query.count == 0) {
                deferred.reject("Lookup failure - unknown stock symbol '?'");//"+symbol+"');
            } else {
                deferred.resolve({dateCreated:data.query.created, data:data.query.results.quote[0]});
            }
        });
        lookupPromise.error(function(data, status, headers, config) {
            console.log("Lookup failure - status: ", status, ", data: ", data);
            deferred.reject("Lookup failure - status: "+ status +", data: "+data);
        });

        return deferred.promise;
    }
    
    return {
        lookup: lookup
    };
});

stockNgServices.factory('utilityService', function() {

    /* template - to pass a template string with %keywords% replaced with the given values.
        eg. template("The time is %time% and I'm speaking to %person%.", {time:"12:44",person:"ted"});*/
    var template = function (string,data){
        return string.replace(/%(\w*)%/g,function(m,key){return data.hasOwnProperty(key)?data[key]:"";});
    }
    
    return {
        template:template
    }
});
