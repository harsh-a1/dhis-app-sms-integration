/**
 * Created by harsh on 15/5/16.
 */

function messageParser(state,msg,smsTo){

    var words = getWords(msg.toUpperCase()," ");

    var firstWord = words[0];

    if (firstWord[0] == 'Z'){
        // is provider code
        state.changeState(ONHOLD);
        state.providerData.providerID = firstWord;
        state.providerData.timestamp = smsTo;
        return
    }
debugger
    switch(firstWord){
        case BACK_CHECK :
        case FOLLOW_UP_VISITS :
        case HOUSEHOLD_VISITS :
            if (words.length == 2){
                state.changeState(ONHOLD);
                state.mawraData.mawraID = words[1];
                state.mawraData.timestamp = smsTo;
                state.mawraData.prevMawra = words[1];
                return
            }
        case NEIGBOURHOOD_MEETING :
        case ORIENTATION_MEETING :
        case AREA_MAPPING :
                state.changeState(ACTION_IMPORT);
                state.firstWord = firstWord;
                state.words = words;
                state.domain = DOMAIN_IPC;
                return
        default :
                state.changeState(INVALID_FORMAT);
                state.domain = DOMAIN_INVALID;
                return
    }
}

function getWords(text,separatedBy){
    var words = [];
    words = text.split(separatedBy);
    return words;
}
