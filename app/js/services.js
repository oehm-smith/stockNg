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
        // returns a promise
        var addStock = function(stockSymbol) {
            //var deferred = $q.defer();

            var newStock = stock({name:stockSymbol});
            var index = stocks.push(newStock);
            stockLookupService.lookup(newStock)
                .then(function(data) {
                    console.log("Lookup success in AddStock - data: ", data);
                    newStock.setName(data.data.Symbol);
                    newStock.setValue(data.data.Close);
                    newStock.setLastDate(data.dateCreated.format("DD/MM/YYYY HH:mm Z"));
                }, function(data) {
                    var name = newStock.getName();
                    console.log("Lookup failure in AddStock - data: ", data);
                    newStock.setName(name + " not listed (index:"+index+")");
                });
        };
        var removeEntry = function(index) {
            console.log("Remove entry: ", index);
            stocks.splice(index,1);
        };
        return {
            getStockList: getStockList,
            setStockList: setStockList,
            addStock: addStock,
            removeEntry: removeEntry,
            stocks: stocks
        };
    });

stockNgServices.factory('stockLookupService', function($http, $q, utilityService) {
    var urlBase = "http://query.yahooapis.com/v1/public/yql?q=";
    var queryTemplate = 'select * from yahoo.finance.historicaldata where symbol = "%symbol%" and startDate = "%startDate%" and endDate = "%endDate%"';
    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
    var exchange = "AX";
    var dateFormatStr = "YYYY-MM-DD[T]HH:mm:ssZ"
    
    var lookup = function(stockObj) {
        var symbol=stockObj.getName()+"."+exchange;
        // Dates - need to be in the form '2014-04-12T07:08:04Z'
        //var endDate = Date.today();
        //endDate.setTimeToNow();
            // take 7 days to make sure I get the last market close day (ie. there might be a group of consecutive of public holidays)
        //var startDate=Date.today();
        //startDate.setTimeToNow();
        //startDate.addDays(-7);
        var endDate = moment();
        var startDate = moment().add('days',-7);
        var endDateF = endDate.format(dateFormatStr);
        var startDateF = startDate.format(dateFormatStr);
        console.log("Start date: ",startDateF,", end date: ", endDateF);
        
        var deferred = $q.defer();
        
        var query = utilityService.template(queryTemplate,{symbol:symbol, startDate:startDateF, endDate:endDateF});

        var urlNoEncode = urlBase + query + format;
        var urlEncode = urlBase + encodeURIComponent(query) + format;

        console.log("Url (unencoded version):",urlNoEncode);
        console.log("Url (encoded version):",urlEncode);

        var lookupPromise = $http.jsonp(urlEncode);
        
        lookupPromise.success(function(data, status, headers, config) {
            console.log("Lookup success - count: ", data.query.count, ", data: ", data);
            if (data.query.count == 0) {
                deferred.reject("Lookup failure - unknown stock symbol '"+symbol+"'");
            } else {
                var theDate = moment(data.query.created,dateFormatStr);
                console.log("Parsed date:",theDate);
                deferred.resolve({dateCreated:theDate, data:data.query.results.quote[0]});
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
