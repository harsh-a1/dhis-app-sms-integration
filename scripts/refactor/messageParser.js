/**
 * Created by harsh on 15/5/16.
 */

function messageParser(state,msg,smsTo){

  var CONSTANTS = require('./constants');

    var words = getWords(msg.toUpperCase()," ");

    var firstWord = words[0];

    if (firstWord[0] == 'Z'){
        if (words.length==1){
            // is provider code
            state.changeState(CONSTANTS.ONHOLD);
            state.providerData.value = firstWord;
            state.providerData.timestamp = smsTo;
            return
        }else{
            invalidImport()
            return
        }
    }

    switch(firstWord){
        case CONSTANTS.FOLLOW_UP_VISITS :
        case CONSTANTS.HOUSEHOLD_VISITS :

                                 if (words.length == 2){
                                    state.changeState(CONSTANTS.ONHOLD);
                                    state.mawraData.value = words[1];
                                    state.mawraData.timestamp = smsTo;
                                    state.mawraData.prevMawra = words[1];
                                    return
                                 }

                                        if (words.length!=4){
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break

        case CONSTANTS.NEIGBOURHOOD_MEETING :
                                        if (words.length!=3){
                                            invalidImport()
                                            break
                                        }
                                            actionImport()
                                            break
        case CONSTANTS.ORIENTATION_MEETING :
                                        if (words.length!=2){
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break

        case CONSTANTS.AREA_MAPPING :
                                        if (words.length !=1){
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break
        default :
                                        invalidImport()
    }


    function actionImport(){
        state.changeState(CONSTANTS.ACTION_IMPORT);
        state.firstWord = firstWord;
        state.words = words;
        state.domain = CONSTANTS.DOMAIN_IPC;
        return
    }

    function invalidImport(){
        state.changeState(CONSTANTS.INVALID_FORMAT);
        state.domain = CONSTANTS.DOMAIN_INVALID;
        return
    }
}

function getWords(text,separatedBy){
    var words = [];
    words = text.split(separatedBy);
    return words;
}

exports.messageParser = messageParser;