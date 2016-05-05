/**
 * Created by harsh on 30/4/16.
 */

function messageParser(smsInfo,dependencies){

    var result = {
        domain : "",
        subDomain : "",
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
        result.subDomain = ONHOLD;
        return result;
    }

    switch(firstWord){
        case BACK_CHECK :
        case FOLLOW_UP_VISITS :
        case HOUSEHOLD_VISITS :
                                if (words.length == 2){
                                    result.interpretation = MAWRAID;
                                    result.output = words[1];
                                    result.subDomain = ONHOLD;
                                    return result;
                                }
        case NEIGBOURHOOD_MEETING :
        case ORIENTATION_MEETING :
        case AREA_MAPPING : return identifiedAs('IPC'); break;
        default : return identifiedAs('IPC',"INVALID");
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
                eventDate: new Date(smsInfo.smsDate),
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
            event.dataValues.push({dataElement:msgCategory.DE_shortcode,value:smsInfo.smsTo});
            event.dataValues.push({
                dataElement: msgCategory.DE_previousMessageTimestamp,
                value: new Date(dependencies.prevMessageTimestamp)
            });

            switch(firstWord){
                case BACK_CHECK :
                case FOLLOW_UP_VISITS :
                case HOUSEHOLD_VISITS :
                                        event.dataValues.push(
                                            {dataElement: msgCategory.DE_previousMessageField, value: dependencies.mawraID});
                                        break;
                case NEIGBOURHOOD_MEETING :
                case ORIENTATION_MEETING :
                case AREA_MAPPING :
                                        event.dataValues.push({dataElement: msgCategory.DE_previousMessageField, value: dependencies.providerID});
                                        break;
                case INVALID_FORMAT :          event.dataValues.push(
                                            {dataElement: msgCategory.DE_smsMessage, value: smsInfo.smsMessage},
                                            {dataElement: msgCategory.DE_shortcode, value: smsInfo.smsTo}
                                        ); break;
                default : event.dataValues.push(
                    {dataElement: msgCategory.DE_smsMessage, value: smsInfo.smsMessage},
                    {dataElement: msgCategory.DE_shortcode, value: smsInfo.smsTo}
                );
                             break;
            }


            result.domain = domain;
            result.operation = ADD_UPDATE_EVENT;
            result.interpretation = firstWord;
            result.output = event;
            result.programStage = msgCategory.programStage;
            return result;
        }
    }
}

function getWords(text,separatedBy){
    var words = [];
    words = text.split(separatedBy);
    return words;
}

