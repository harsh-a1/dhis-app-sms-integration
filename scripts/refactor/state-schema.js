/**
 * Created by harsh on 14/5/16.
 */

StateMachine = function(){

    this.currentState = START_STATE;
    this.tei = "";
    this.messageType = "";
    this.providerData = {}
    this.mawraData = {}

}

StateMachine.prototype.valid = function(){

}

StateMachine.prototype.changeState = function(state){
    this.currentState = state;
    this.messageType = state;
}
