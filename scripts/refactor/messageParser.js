/**
 * Created by harsh on 15/5/16.
 */

function messageParser(state,msg,smsTo){

    var words = getWords(msg.toUpperCase()," ");

    var firstWord = words[0];

    if (firstWord[0] == 'Z'){
        if (words.length==1){
            // is provider code
            state.changeState(ONHOLD);
            state.providerData.value = firstWord;
            state.providerData.timestamp = smsTo;
            return
        }else{
            state.changeState(INVALID_FORMAT);
            state.domain = DOMAIN_INVALID;
            return
        }
    }

    switch(firstWord){
        case FOLLOW_UP_VISITS :
        case HOUSEHOLD_VISITS :

            if (words.length == 2){
                state.changeState(ONHOLD);
                state.mawraData.value = words[1];
                state.mawraData.timestamp = smsTo;
                state.mawraData.prevMawra = words[1];
                return
            }

            if (words.length!=4){
                state.changeState(INVALID_FORMAT);
                state.domain = DOMAIN_INVALID;
                return
            }
        case NEIGBOURHOOD_MEETING :
        case ORIENTATION_MEETING :
            if (words.length!=3){
                state.changeState(INVALID_FORMAT);
                state.domain = DOMAIN_INVALID;
                return
            }
        case AREA_MAPPING :
            if (words.length !=1){
                state.changeState(INVALID_FORMAT);
                state.domain = DOMAIN_INVALID;
                return
            }
                state.changeState(ACTION_IMPORT);
                state.firstWord = firstWord;
                state.words = words;
                state.domain = DOMAIN_IPC;
                return
     //   case BACK_CHECK :
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
