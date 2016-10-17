/**
 * Created by harsh on 15/5/16.
 */

function messageParser(state,msg,smsTo){

    var words = getWords(msg.toUpperCase()," ");

    var firstWord = words[0];
    var secondWord = words[1];

    if (firstWord[0] == 'Z'){
        if (words.length==1){
            // is provider code
            state.changeState(ONHOLD);
            state.providerData.value = firstWord;
            state.providerData.timestamp = smsTo;
            return
        }
    }
    else if(firstWord[0] == 'I'){
        if (words.length==1){
            // is provider code
            state.changeState(ONHOLD);
            state.providerData.value = firstWord;
            state.providerData.timestamp = smsTo;
            return
        }

    }
    // BC
    else if(firstWord[0] == 'B' && secondWord[0] == 'I'){

        if (words.length==2){
            // is provider code
            state.changeState(ONHOLD);
            state.providerData.value = secondWord;
            state.providerData.timestamp = smsTo;
            return
        }

    }
    // SSH
    else if(firstWord[0] == 'I' && secondWord[0] == 'R'){

        if (words.length==2){
            // is provider code
            state.changeState(ONHOLD);
            state.providerData.value = secondWord;
            state.providerData.timestamp = smsTo;
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
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break

        case NEIGBOURHOOD_MEETING :
                                        if (words.length!=3){
                                            invalidImport()
                                            break
                                        }
                                            actionImport()
                                       break
        case ORIENTATION_MEETING :
                                        if (words.length!=2){
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break

        case AREA_MAPPING :
                                        if (words.length !=1){
                                            invalidImport()
                                            break
                                        }
                                        actionImport()
                                        break

        case SUPERVISORY_SUPPORT_ORIENTATION_MEETING :

                                        if(words.length ==2){
                                            actionImport()
                                            break
                                        }

                                         invalidImport()
                                           break

        case SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING :

                                        if(words.length ==4){
                                            actionImport()

                                            break
                                        }
                                        invalidImport();
                                            break;

        case BACK_CHECK :

                                      if(words.length == 3) {
                                          actionImport()
                                          break
                                      }
                                    invalidImport()
                                         break

        case SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT :

                                        if(words.length ==3){
                                            actionImport()
                                            break
                                        }
                                        invalidImport()
                                             break


        default :
                                        invalidImport()
    }


    function actionImport(){
        state.changeState(ACTION_IMPORT);
        state.firstWord = firstWord;
        state.words = words;
        state.domain = DOMAIN_IPC;
        return
    }

    function invalidImport(){
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
