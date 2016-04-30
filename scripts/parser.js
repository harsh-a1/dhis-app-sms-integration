/**
 * Created by harsh on 30/4/16.
 */

function messageParser(smsInfo,dependencies){

    var result = {
        domain : "",
        interpretation:"",
        operation : "" ,
        message: "" ,
        output : ""
    };

    var words = getWords(smsInfo.smsMessage.toUpperCase()," ");
    var firstWord = words[0];

    if (firstWord[0] == 'Z'){
        // is provider code
        result.interpretation = PROVIDER_ID;
        result.output = firstWord;
        return result;
    }

    switch(firstWord){
        case ORIENTATION_MEETING :
        case NEIGBOURHOOD_MEETING :
        case 'AM' : return identifiedAs('IPC'); break;
    }

    function identifiedAs(domain){
        if (domain == 'IPC'){
            // create event
            var msgCategory = FFM_METADATA_MAP[domain][firstWord];
            var event = {
                programStage : msgCategory.programStage,
                trackedEntityInstance: dependencies.tei.trackedEntityInstance,
                program : msgCategory.program,
                orgUnit: dependencies.tei.orgUnit,
                eventDate: new Date(),
                storedBy: dependencies.userName,
                dataValues : []
            }

            //Datavalues Parser
            for (var i=1;i<words.length;i++){
                if (msgCategory.pattern[i]){
                    var deUID = msgCategory[msgCategory.pattern[i]];
                    if (deUID){
                        event.dataValues.push({dataElement:deUID,value:words[i]});
                    }
                }
            }

            //Add timestamp and shortcode
            event.dataValues.push({dataElement:msgCategory.DE_timestamp,value: new Date(smsInfo.smsDate)});
            event.dataValues.push({dataElement:msgCategory.DE_shortcode,value:smsInfo.smsTo});

            result.domain = domain;
            result.operation = ADD_UPDATE_EVENT;
            result.interpretation = firstWord;
            result.output = event;

            return result;
        }
    }
}


function getWords(text,separatedBy){
    var words = [];
    words = text.split(separatedBy);
    return words;
}

