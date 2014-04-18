/** Use JQuery to load the objects **/

/** Stocks **/

$.getScript("js/stockObject.js")
    .done(function( data, textStatus, jqxhr ) {
        //console.log( "DATA:"+data ); // Data returned
        console.log( textStatus ); // Success
        console.log( jqxhr.status ); // 200
        console.log( "Load was performed." );
    })
    .fail(function(jqxhr, settings, exception) {
        console.log("stockObject load failed.");
    });
