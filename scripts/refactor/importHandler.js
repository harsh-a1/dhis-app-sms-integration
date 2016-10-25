/**
 * Created by harsh on 14/5/16.
 */

function importHandler(state,sms,callback){
    var phone = sms.smsFrom.substr(1,sms.smsFrom.length);// remove + sign from number

    //if (isForSkipping()){
    //    skipSMS();
    //    return
    //}

    switch(state.currentState){
        case INVALID_PHONE : if (isForSkipping()){
                                skipSMS(); break
                                }
                            prepareInvalidEvent();break
        case ACTION_IMPORT : if (isForSkipping()){
                           skipSMS(); break
                            }
                            prepareEvent();break
        case INVALID_PAIR :
        case INVALID_FORMAT : if (isForSkipping()){
                                    skipSMS(); break
                                    }
                            prepareInvalidFormatEvent(); break
    }

    function prepareInvalidEvent(){
        var invalidProgramUID = FFM_METADATA_MAP[state.currentState].program;
        var timestamp = new Date(sms.smsDate);
        var startDate = sms.smsDate.split(" ")[0];
        var DE_smsMessage = FFM_METADATA_MAP[state.currentState].DE_smsMessage;
        var DE_shortcode = FFM_METADATA_MAP[state.currentState].DE_shortcode;
        //var orgUnit = FFM_METADATA_MAP[state.currentState].orgUnit;
        var orgUnit = state.ou;

        var event = new dhis2API.event();
            event.program = invalidProgramUID;
            event.orgUnit = orgUnit;
            event.eventDate = new Date(sms.smsDate);

            event.dataValues.push({dataElement:DE_smsMessage,value : sms.smsMessage});
            event.dataValues.push({dataElement:DE_shortcode,value : sms.smsTo});

        getEventIfExists_INVALID_PHONE(startDate,timestamp,invalidProgramUID).then(function(eventUID){
            if (eventUID){
                event.PUT(state.messageType,sms.smsDate,phone,callback,eventUID);
            }else{ //create a new one
                event.POST(state.messageType,sms.smsDate,phone,callback);
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
        var DE_IPCCode = FFM_METADATA_MAP[state.firstWord].DE_IPCCode;
        var DE_LastMawra = FFM_METADATA_MAP[state.firstWord].DE_lastMawraId;
        var DE_FirstMawra = FFM_METADATA_MAP[state.firstWord].DE_firstMawraId;
        var DE_SSH_clientsRegistered = FFM_METADATA_MAP[state.firstWord].DE_clientsRegistered;

       // var orgUnit = FFM_METADATA_MAP[state.firstWord].orgUnit;
        var orgUnit = state.ou;

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

        //get prev message data
        var prev_timestamp ;
        var prev_value,shortCode;
        var ipcCode, clientsReg, lastMawraId;
        var prev_data_holder = undefined;

        switch(state.firstWord){
            case BACK_CHECK :
            case FOLLOW_UP_VISITS :
            case HOUSEHOLD_VISITS :
            case SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT :
                                    prev_data_holder = "mawraData";
                                    break
            case NEIGBOURHOOD_MEETING :
            case ORIENTATION_MEETING :
            case AREA_MAPPING :
            case SUPERVISORY_SUPPORT_ORIENTATION_MEETING :
            case SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING :
            case SUPERVISORY_SUPPORT_ORIENTATION_MEETING_AM :
            case SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING_AM :
            case SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT_AM :
            case BACK_CHECK_AM :
                                    prev_data_holder = "providerData";
                                    break

        }
        if(sms.smsMessage =='TR' ||sms.smsMessage =='MTG' || sms.smsMessage =='OL' ||sms.smsMessage =='TRSUPER' || sms.smsMessage == 'MTGSUPER' || sms.smsMessage =='OLSUPER'

        || sms.smsMessage =='TRAM' ||sms.smsMessage =='MTGAM' ||sms.smsMessage =='OLAM'){
            prev_timestamp = "";
            prev_value = "";


          //  event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
           // event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});

        }
        else if(sms.smsMessage.charAt(0) == 'B' && sms.smsMessage.charAt(3)== 'I'){ //BC msg

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;
            ipcCode = state[prev_data_holder].IPCCode;

            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
         //   event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_IPCCode, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});
           // event.dataValues.push({dataElement: DE_IPCCode, value: ipcCode});
        }


       else if(sms.smsMessage.charAt(0) == 'S' && sms.smsMessage.charAt(1)== 'S' && sms.smsMessage.charAt(2)== 'O' && (state.currentState == ACTION_IMPORT)){

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;


            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
            event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});
        }
        else if(sms.smsMessage.charAt(0) == 'S' && sms.smsMessage.charAt(1)== 'S' && sms.smsMessage.charAt(2)== 'H' && (state.currentState == ACTION_IMPORT)){

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;
            ipcCode = state[prev_data_holder].IPCCode;
           // clientsReg = state[prev_data_holder].thirdWord;
           // lastMawraId = state[prev_data_holder].lastMawra;

            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
            event.dataValues.push({dataElement: DE_FirstMawra, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});
            //event.dataValues.push({dataElement: DE_SSH_clientsRegistered, value: clientsReg});
            event.dataValues.push({dataElement: DE_IPCCode, value: ipcCode});
            //event.dataValues.push({dataElement: DE_LastMawra, value: lastMawraId});
        }
        else if(sms.smsMessage.charAt(0) == 'S' && sms.smsMessage.charAt(1)== 'S' && sms.smsMessage.charAt(2)== 'N' && (state.currentState == ACTION_IMPORT)){

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;

            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
            event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});
        }
        else if(sms.smsMessage.charAt(0) == 'B' && sms.smsMessage.charAt(1)== 'C' && (state.currentState == ACTION_IMPORT)){

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;

            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
            event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});
        }
        else {

            prev_timestamp = state[prev_data_holder].timestamp;
            prev_value = state[prev_data_holder].value;

            event.dataValues.push({dataElement: DE_previousMessageTimestamp, value: prev_timestamp});
            event.dataValues.push({dataElement: DE_previousMessageField, value: prev_value});
            event.dataValues.push({dataElement: DE_shortcode, value: sms.smsTo});

        }

        getEventIfExists(startDate,timestamp,programStage,state.tei.trackedEntityInstance).then(function(eventUID){
            if (eventUID){
                event.PUT(state.messageType,sms.smsDate,phone,callback,eventUID);
            }else{
                //create a new one
                event.POST(state.messageType,sms.smsDate,phone,callback);
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

       // var orgUnit = FFM_METADATA_MAP[state.currentState].orgUnit;
        var orgUnit = state.ou;
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
                event.PUT(state.messageType,sms.smsDate,phone,callback,eventUID);
            }else{
                //create a new one
                event.POST(state.messageType,sms.smsDate,phone,callback);
            }
        })
    }

    function skipSMS(){
        var response = [];
        response.smsDate = sms.smsDate;
        response.messageType = state.messageType;
        response.importType = SKIP;
        response.phone = phone;
    callback(response);
    }

    function isForSkipping(){
        if (state.skipCriteria[state.domain]){
            return true;
        }
        return false;
    }
}