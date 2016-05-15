/**
 * Created by harsh on 4/5/16.
 */

function Summary(){

    this.report = [];

    this.rowMapForSMS = [];
    this.smsMapByTimestamp = [];

}
Summary.prototype.addRow = function(phone){
    var row = {phone:phone,
        sms : []};

    this.report.push(row);
    this.rowMapForSMS[phone] = row.sms;

}

Summary.prototype.addSMSDetails = function(phone, sms){
    var smsItem = {};
    smsItem.smsMessage = sms.smsMessage;
    smsItem.shortcode = sms.shortcode;
    smsItem.smsDate = sms.smsDate;

    this.smsMapByTimestamp[smsItem.smsDate] = smsItem;
    this.rowMapForSMS[phone].push(smsItem);

}

Summary.prototype.addOnHoldResponse = function(sms,state){
    var smsItem = this.smsMapByTimestamp[sms.smsDate];

    smsItem.status = NOT_APPLICABLE;
    smsItem.conflicts = undefined;
    smsItem.reference = NOT_APPLICABLE;
    smsItem.messageType = state.messageType;
    smsItem.importType = NOT_APPLICABLE;


    this.smsMapByTimestamp[sms.smsDate] = smsItem;
}
Summary.prototype.addResponse = function(response){
    var smsItem = this.smsMapByTimestamp[response.smsDate];

    smsItem.status = findStatus(response);
    smsItem.conflicts = findConflicts(response);
    smsItem.reference = findReference(response);
    smsItem.messageType = response.messageType;
    smsItem.importType = response.importType;


    this.smsMapByTimestamp[response.smsDate] = smsItem;
}