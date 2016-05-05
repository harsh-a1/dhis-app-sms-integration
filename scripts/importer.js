/**
 * Created by harsh on 25/4/16.
 */

function importer(parsed,dependencies){

    switch(parsed.operation){
        case ADD_UPDATE_EVENT : return addUpdateEvent(parsed.output); break
    }

    function addUpdateEvent(event){
        var def = $.Deferred();

        getEventIfExists(dependencies.tei.trackedEntityInstance,
                         dependencies.smsDate,
                         parsed.output.eventDate,parsed.programStage).then(function(eventUID){
           if (eventUID){
               updateEvent(event,eventUID).then(function(response){
                    def.resolve(response);
               })
           }else{ //create a new one
               createEvent(event).then(function (response){
                   def.resolve(response);
               })
           }
       });
        return def;
    }
}

function getEventIfExists(tei,startDate,timestamp,programStage){
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../events?paging=false&trackedEntityInstance='+tei+'&startDate='+startDate+"&programStage="+programStage,
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

function createEvent(event){
    var def = $.Deferred();
    $.ajax({
        type: "POST",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../events',
        data: JSON.stringify(event),
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
}
function updateEvent(event,id){
    var def = $.Deferred();
    $.ajax({
        type: "PUT",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../events/'+id,
        data: JSON.stringify(event),
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
}

function getTEIByAttribute (rootOU,attrListWithValue){
    var filterAPI = "";
    for (var i=0;i<attrListWithValue.length;i++){
        filterAPI = filterAPI+"&filter="+attrListWithValue[i].attr+":eq:"+attrListWithValue[i].value;
    }

    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../trackedEntityInstances?ou='+rootOU+'&ouMode=DESCENDANTS'+filterAPI,
        success: function (data) {
            def.resolve(data.trackedEntityInstances);
        }
    });
    return def;
}
