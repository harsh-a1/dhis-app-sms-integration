/**
 * Created by harsh on 25/4/16.
 */

function importer(data){

    switch(data.operation){
        case ADD_UPDATE_EVENT : addUpdateEvent(data.output); break
    }

    function addUpdateEvent(event){

        // get events which have the timestamp de eq to sms timestamp
        // format attributes and their values then send to function

       var existingEvent = getEventIfExists();
        if (!existingEvent){
            //create one
            debugger
            createEvent(event).then(function (response){
                //
            })
        }
    }
}

function getEventIfExists(){
    var event=undefined;

    return event;
}

function createEvent(event){
    var def = $.Deferred();
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: '../../events',
        data: JSON.stringify(event),
        success: function (data) {
debugger
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
