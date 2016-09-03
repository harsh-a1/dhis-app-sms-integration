/**
 * Created by harsh on 22/4/16.
 */

exports.DateToday = new Date();
exports.WITH_REGISTRATION = "WITH_REGISTRATION";
exports.ACTION_IMPORT = "ACTION_IMPORT";
exports.UPDATE = "UPDATE";
exports.CREATE_EVENT = "CREATE_EVENT";
exports.NOT_APPLICABLE = "N/A";
exports.SKIP = "SKIP";
//STates
exports.START_STATE = "START_STATE";
exports.INVALID_PHONE = "INVALID_PHONE";
exports.DOMAIN_IPC = "DOMAIN_IPC";
exports.DOMAIN_SALES= "DOMAIN_SALES";
exports.DOMAIN_HS = "DOMAIN_HS";
exports.DOMAIN_INVALID = "DOMAIN_INVALID";

// interpretations
exports.ONHOLD = "START_MSG";
exports.PROVIDER_ID = "providerID";
exports.MAWRAID = "MawraId";
exports.INVALID_FORMAT = "INVALID_FORMAT";
exports.INVALID_PAIR = "INVALID_PAIR";

// Sub Domains
exports.ORIENTATION_MEETING = "OM";
exports.NEIGBOURHOOD_MEETING = "NM";
exports.BACK_CHECK = "BC";
exports.HOUSEHOLD_VISITS = "HH";
exports.AREA_MAPPING = "AM";
exports.FOLLOW_UP_VISITS = "FV";

// Operational mappings
exports.PHONE_ATTR_UID = "SxSh9297ihW";
exports.ROOT_OU_UID ="tZJsIdHAfKq";
exports.ADD_UPDATE_EVENT = "add_update_event";
exports.ADD_UPDATE_EVENT_INVALID = "ADD_UPDATE_EVENT_INVALID";
exports.ADD_UPDATE_EVENT_INVALID_PHONE = "ADD_UPDATE_EVENT_INVALID_PHONE";
exports.PR_FFM_IPC = "TbYUPaBChYR";
exports.PR_FFM_INVALID = "QjQT4k8M4ma";

//Program Stages
exports.PRST_ORIENTATION_MEETING = "OMHUToxZR03";
exports.PRST_NEIGBOURHOOD_MEETING = "mDwBhWDmLfr";
exports.PRST_HOUSEHOLD_VISITS = "n2CFuvwUvnh";
exports.PRST_AREA_MAPPING = "k7gHjJ4LFOU";
exports.PRST_FOLLOWUP_VISITS = "hVVdocIy72g";
exports.PRST_INVALID_FORMAT = "CCEEqcvtLjA";
exports.PRST_INVALID = "pmj1wbykdGj";

/* Common */
exports.ProviderCode = "sBD5FEalBsU";
exports.Shortcode = "Jtty2PVrrjn";
exports.PreviousMessageTimestamp = "ILL6OzRVVrF";
exports.FirstMawraID = "qbK1eGEgVD4";
exports.Tokens_Issued = "gBdx1XMCySe";
exports.LastMawraId = "vKpDeWYKhHk";


/* Orientation Meeting  */
exports.OM_NumOfParticipants = "Pusk3tS9CEP";

/* Neighbourhood Meeting  */
exports.NM_NumOfParticipants = "dvLvzUaJeQh";

/*Household Visits*/
exports.HH_Clients_Registered = "nUqWTyxWCZs";

/*Follow Up Visits*/
exports.FV_clientsRegistered = "NoGwMfqdSOY";

/* Inavlid */
exports.INVALID_smsMessage = "lplLrUUG34W";
exports.INVALID_smsTo = "";

// Create stage for all cases
// Handle invalid messages
// make import Summary
// clean xml before arsing
// Java service to fetch data
// Autmatic scheduling of app

exports.FFM_METADATA_MAP = {
    INVALID_PHONE : {
        program : exports.PR_FFM_INVALID,
        orgUnit : exports.ROOT_OU_UID,
        DE_smsMessage : exports.INVALID_smsMessage,
        DE_shortcode :  exports.Shortcode
    },
    INVALID_FORMAT : {
        pattern : {  },
        program : exports.PR_FFM_IPC,
        orgUnit : exports.ROOT_OU_UID,
        programStage : exports.PRST_INVALID_FORMAT,
        DE_smsMessage : exports.INVALID_smsMessage,
        DE_shortcode : exports.Shortcode,
        DE_smsTo : exports.INVALID_smsTo
    },
    INVALID_PAIR : {
        pattern : {  },
        program : exports.PR_FFM_IPC,
        orgUnit : exports.ROOT_OU_UID,
        programStage : exports.PRST_INVALID_FORMAT,
        DE_smsMessage : exports.INVALID_smsMessage,
        DE_shortcode : exports.Shortcode,
        DE_smsTo : exports.INVALID_smsTo
    },
    OM : {
        pattern : { 1 :  "DE_numOfParticipants" },
        program : exports.PR_FFM_IPC,
        programStage : exports.PRST_ORIENTATION_MEETING,
        orgUnit : exports.ROOT_OU_UID,
        DE_previousMessageField : exports.ProviderCode,
        DE_numOfParticipants : exports.OM_NumOfParticipants,
        DE_shortcode : exports.Shortcode,
        DE_previousMessageTimestamp : exports.PreviousMessageTimestamp
    },
    AM : {
        pattern : { },
        program : exports.PR_FFM_IPC,
        orgUnit : exports.ROOT_OU_UID,
        programStage : exports.PRST_AREA_MAPPING,
        DE_previousMessageField : exports.ProviderCode,
        DE_shortcode : exports.Shortcode,
        DE_previousMessageTimestamp : exports.PreviousMessageTimestamp
    },
    NM : {
        pattern : { 1 : "DE_totalParticipants",
            2 : "DE_tokensIssued"
        },
        program : exports.PR_FFM_IPC,
        programStage : exports.PRST_NEIGBOURHOOD_MEETING,
        orgUnit : exports.ROOT_OU_UID,
        DE_previousMessageField : exports.ProviderCode,
        DE_shortcode : exports.Shortcode,
        DE_previousMessageTimestamp : exports.PreviousMessageTimestamp,
        DE_totalParticipants : exports.NM_NumOfParticipants,
        DE_tokensIssued : exports.Tokens_Issued
    },
    HH : {
        pattern : { 1 : "DE_lastMawraId",
            2 : "DE_clientsRegistered",
            3 : "DE_tokensIssued"
        },
        program : exports.PR_FFM_IPC,
        programStage : exports.PRST_HOUSEHOLD_VISITS,
        orgUnit : exports.ROOT_OU_UID,
        DE_previousMessageField : exports.FirstMawraID,
        DE_shortcode : exports.Shortcode,
        DE_previousMessageTimestamp : exports.PreviousMessageTimestamp,
        DE_lastMawraId : exports.LastMawraId,
        DE_tokensIssued : exports.Tokens_Issued,
        DE_clientsRegistered : exports.HH_Clients_Registered
    },
    FV : {
        pattern : { 1 : "DE_lastMawraId",
            2 : "DE_clientsRegistered",
            3 : "DE_tokensIssued"
        },
        program : exports.PR_FFM_IPC,
        programStage : exports.PRST_FOLLOWUP_VISITS,
        orgUnit : exports.ROOT_OU_UID,
        DE_previousMessageField : exports.FirstMawraID,
        DE_shortcode : exports.Shortcode,
        DE_previousMessageTimestamp : exports.PreviousMessageTimestamp,
        DE_lastMawraId : exports.LastMawraId,
        DE_tokensIssued : exports.Tokens_Issued,
        DE_clientsRegistered : exports.FV_clientsRegistered
    }

}
