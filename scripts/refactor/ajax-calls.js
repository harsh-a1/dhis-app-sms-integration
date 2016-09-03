/**
 * Created by harsh on 14/5/16.
 */

var request = require('request');
function getEventIfExists_INVALID_PHONE(startDate,timestamp,program){
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../events?skipPaging=true&eventDate='+startDate+"&program="+program,
        success: function (data) {
            for (var i=0;i<data.events.length;i++){
                var ed = new Date(data.events[i].eventDate)
                if ( ed.getTime() == timestamp.getTime()){
                    def.resolve(data.events[i].event);
                }
            }
            def.resolve(undefined);
        }
    });
    return def;
}

function getEventIfExists(startDate,timestamp,programStage,tei){
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../events?skipPaging=true&eventDate='+startDate+"&programStage="+programStage+"&trackedEntityInstance="+tei,
        success: function (data) {
            for (var i=0;i<data.events.length;i++){
                var ed = new Date(data.events[i].eventDate)
                if ( ed.getTime() == timestamp.getTime()){
                    def.resolve(data.events[i].event);
                }
            }
            def.resolve(undefined);
        }
    });
    return def;
}


exports.getReqJSONP = function(url,data,callback) {
    request({
        url: url,
        method: "GET",
        dataType: "jsonp",
        crossDomain: true,
        data : "xmldoc="+data,
        jsonpCallback: 'response'
    }, function (error, response, body) {
        callback(error,response,body);

    });
}