/** Use JQuery to load the objects **/

/** Stocks **/

$.getScript("js/stockObject.js")
    .done(function( data, textStatus, jqxhr ) {
        console.log( textStatus ); // Success
        console.log( jqxhr.status ); // 200
    })
    .fail(function(jqxhr, settings, exception) {
        console.log("stockObject load failed.");
    });
