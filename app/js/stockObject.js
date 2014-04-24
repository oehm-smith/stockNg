console.log("stock obj file");
/*
 * Members:
 *  String: name
 *  Number: value at lastDate
 *  Date: lastDate that the value was set
 */
var stock=function(spec) {
    var that={};
    var me = {};
    setupObject(spec);
    
    that.getName=function() {
        return me.name;
    } 
    
    that.setName=function(name) {
        me.name=name;
    }
    
    that.getValue=function() {
        return me.value;
    } 
    
    that.setValue=function(value) {
        me.value=value;
    }
    
    that.getLastDate=function() {
        return me.lastDate;
    } 
    
    that.setLastDate=function(date) {
        me.lastDate=date;
    }
    
    function setupObject(spec) {
        console.log("setuP object: ", spec);
        me.name = spec.name || "";
        me.value = spec.value || 0;
        me.lastDate = spec.lastDate || 0;
    };
        
    return that;
}; 