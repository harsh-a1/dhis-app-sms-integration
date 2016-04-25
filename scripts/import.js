/**
 * Created by harsh on 25/4/16.
 */

function importer(data){

    switch(data.operation){
        case ADD_UPDATE_EVENT : addUpdateEvent(data.output); break
    }

    function addUpdateEvent(event){

    }
}

function messageParser(smsInfo){

var result = {domain : "",interpretation:"", operation : "" ,message: "" , output : ""};

    var words = getWords(smsInfo.smsMessage.toUpperCase()," ");
    var firstWord = words[0];

    if (firstWord[0] == 'Z'){
        // is provider code
        result.interpretation = "PROVIDERID";
        return result;
    }

    switch(firstWord){
        case 'OM' :
        case 'NM' :
        case 'AM' : identifiedAs('IPC'); break;
    }

    function identifiedAs(domain){
        if (domain == 'IPC'){
            // create event
            var msgCategory = FFM_METADATA_MAP[domain][firstWord];
            var event = {
                        programStage : msgCategory.programStage,
                        dataValues : []
                        }

            for (var i=1;i<words.length;i++){
                var deUID = msgCategory[i];
                if (deUID)
                event.dataValues.push({deUID : words[i]});
            }

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

