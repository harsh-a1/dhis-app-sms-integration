/**
 * Created by harsh on 14/5/16.
 */

function importHandler(state,sms,callback){

    switch(state.currentState){
        case INVALID_PHONE : prepareInvalidEvent();break
        case ACTION_IMPORT : prepareEvent();break
        case INVALID_FORMAT : prepareInvalidFormatEvent(); break
    }

    function prepareInvalidEvent(){
        var invalidProgramUID = FFM_METADATA_MAP[state.currentState].program;
        var timestamp = new Date(sms.smsDate);
        var startDate = sms.smsDate.split(" ")[0];
        var DE_smsMessage = FFM_METADATA_MAP[state.currentState].DE_smsMessage;
        var DE_shortcode = FFM_METADATA_MAP[state.currentState].DE_shortcode;
        var orgUnit = FFM_METADATA_MAP[state.currentState].orgUnit;

        var event = new dhis2API.event();
            event.program = invalidProgramUID;
            event.orgUnit = orgUnit;
            event.eventDate = new Date(sms.smsDate);

            event.dataValues.push({dataElement:DE_smsMessage,value : sms.smsMessage});
            event.dataValues.push({dataElement:DE_shortcode,value : sms.smsTo});

        getEventIfExists_INVALID_PHONE(startDate,timestamp,invalidProgramUID).then(function(eventUID){

            if (eventUID){
                event.PUT(state.messageType,sms.smsDate,callback,eventUID);
            }else{ //create a new one
                event.POST(state.messageType,sms.smsDate,callback);
            }
        })

    }

    function prepareEvent(){
        var program = FFM_METADATA_MAP[state.firstWord].program;
        var programStage = FFM_METADATA_MAP[state.firstWord].programStage;
        var timestamp = new Date(sms.smsDate);
        var startDate = sms.smsDate.split(" ")[0];
        var DE_shortcode = FFM_METADATA_MAP[state.firstWord].DE_shortcode;
        var DE_previousMessageTimestamp = FFM_METADATA_MAP[state.firstWord].DE_previousMessageTimestamp;
        var DE_previousMessageField = FFM_METADATA_MAP[state.firstWord].DE_previousMessageField;

        var orgUnit = FFM_METADATA_MAP[state.firstWord].orgUnit;

        var event = new dhis2API.event();
            event.program = program;
            event.programStage = programStage;
            event.orgUnit = orgUnit;
            event.tei = state.tei.trackedEntityInstance;
            event.eventDate = new Date(sms.smsDate);

        var msgCategory = FFM_METADATA_MAP[state.firstWord];

        //Datavalues Parser
        for (var i=1;i<state.words.length;i++){
            if (msgCategory.pattern[i]){
                var deUID = msgCategory[msgCategory.pattern[i]];
                if (deUID){
                    event.dataValues.push({dataElement:deUID,value:state.words[i]});
                }
            }
        }

            event.dataValues.push({dataElement:DE_previousMessageTimestamp,value : new Date(state.mawraData.timestamp)});
            event.dataValues.push({dataElement:DE_previousMessageField,value : state.mawraData.mawraID});
            event.dataValues.push({dataElement:DE_shortcode,value : sms.smsTo});

        getEventIfExists(startDate,timestamp,programStage,state.tei.trackedEntityInstance).then(function(eventUID){
            if (eventUID){
                event.PUT(state.messageType,sms.smsDate,callback,eventUID);
            }else{
                //create a new one
                event.POST(state.messageType,sms.smsDate,callback);
            }
        })
    }

    function prepareInvalidFormatEvent(){
        var program = FFM_METADATA_MAP[state.currentState].program;
        var programStage = FFM_METADATA_MAP[state.currentState].programStage;
        var timestamp = new Date(sms.smsDate);
        var startDate = sms.smsDate.split(" ")[0];
        var DE_shortcode = FFM_METADATA_MAP[state.currentState].DE_shortcode;
        var DE_smsMessage = FFM_METADATA_MAP[state.currentState].DE_smsMessage;


        var orgUnit = FFM_METADATA_MAP[state.currentState].orgUnit;

        var event = new dhis2API.event();
        event.program = program;
        event.programStage = programStage;
        event.orgUnit = orgUnit;
        event.tei = state.tei.trackedEntityInstance;
        event.eventDate = new Date(sms.smsDate);

        event.dataValues.push({dataElement:DE_smsMessage,value : sms.smsMessage});
        event.dataValues.push({dataElement:DE_shortcode,value : sms.smsTo});

        getEventIfExists(startDate,timestamp,programStage,state.tei.trackedEntityInstance).then(function(eventUID){
            if (eventUID){
                event.PUT(state.messageType,sms.smsDate,callback,eventUID);
            }else{
                //create a new one
                event.POST(state.messageType,sms.smsDate,callback);
            }
        })
    }
}