/**
 * Created by harsh on 14/5/16.
 */

StateMachine = function(){

    this.currentState = START_STATE;
    this.tei = "";
    this.messageType = "";
    this.providerData = {}
    this.mawraData = {};
    this.domain = "";
    this.pairReady=false

}

StateMachine.prototype.valid = function(){

}

StateMachine.prototype.changeState = function(state){
    this.currentState = state;
    this.messageType = state;

    if (state == INVALID_PHONE){
        this.domain = DOMAIN_INVALID;
    }
}
