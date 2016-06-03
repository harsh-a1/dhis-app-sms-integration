/**
 * Created by harsh on 22/4/16.
 */

const DateToday = new Date();
const WITH_REGISTRATION = "WITH_REGISTRATION";
const ACTION_IMPORT = "ACTION_IMPORT";
const UPDATE = "UPDATE";
const CREATE_EVENT = "CREATE_EVENT";
const NOT_APPLICABLE = "N/A";
const SKIP = "SKIP";
//STates
const START_STATE = "START_STATE";
const INVALID_PHONE = "INVALID_PHONE";
const DOMAIN_IPC = "DOMAIN_IPC";
const DOMAIN_SALES= "DOMAIN_SALES";
const DOMAIN_HS = "DOMAIN_HS";
const DOMAIN_INVALID = "DOMAIN_INVALID";

// interpretations
const ONHOLD = "START_MSG";
const PROVIDER_ID = "providerID";
const MAWRAID = "MawraId";
const INVALID_FORMAT = "INVALID_FORMAT";

// Sub Domains
const ORIENTATION_MEETING = "OM";
const NEIGBOURHOOD_MEETING = "NM";
const BACK_CHECK = "BC";
const HOUSEHOLD_VISITS = "HH";
const AREA_MAPPING = "AM";
const FOLLOW_UP_VISITS = "FV";

// Operational mappings
const PHONE_ATTR_UID = "SxSh9297ihW";
const ROOT_OU_UID ="tZJsIdHAfKq";
const ADD_UPDATE_EVENT = "add_update_event";
const ADD_UPDATE_EVENT_INVALID = "ADD_UPDATE_EVENT_INVALID";
const ADD_UPDATE_EVENT_INVALID_PHONE = "ADD_UPDATE_EVENT_INVALID_PHONE";
const PR_FFM_IPC = "TbYUPaBChYR";
const PR_FFM_INVALID = "QjQT4k8M4ma";

//Program Stages
const PRST_ORIENTATION_MEETING = "OMHUToxZR03";
const PRST_NEIGBOURHOOD_MEETING = "mDwBhWDmLfr";
const PRST_HOUSEHOLD_VISITS = "n2CFuvwUvnh";
const PRST_AREA_MAPPING = "k7gHjJ4LFOU";
const PRST_FOLLOWUP_VISITS = "hVVdocIy72g";
const PRST_INVALID_FORMAT = "CCEEqcvtLjA";
const PRST_INVALID = "pmj1wbykdGj";

/* Common */
const ProviderCode = "sBD5FEalBsU";
const Shortcode = "Jtty2PVrrjn";
const PreviousMessageTimestamp = "ILL6OzRVVrF";
const FirstMawraID = "qbK1eGEgVD4";
const Tokens_Issued = "gBdx1XMCySe";
const LastMawraId = "vKpDeWYKhHk";


/* Orientation Meeting  */
const OM_NumOfParticipants = "Pusk3tS9CEP";

/* Neighbourhood Meeting  */
const NM_NumOfParticipants = "dvLvzUaJeQh";

/*Household Visits*/
const HH_Clients_Registered = "nUqWTyxWCZs";

/*Follow Up Visits*/
const FV_clientsRegistered = "NoGwMfqdSOY";

/* Inavlid */
const INVALID_smsMessage = "lplLrUUG34W";
const INVALID_smsTo = "";

// Create stage for all cases
// Handle invalid messages
// make import Summary
// clean xml before arsing
// Java service to fetch data
// Autmatic scheduling of app

const FFM_METADATA_MAP = {
    INVALID_PHONE : {
        program : PR_FFM_INVALID,
        orgUnit : ROOT_OU_UID,
        DE_smsMessage : INVALID_smsMessage,
        DE_shortcode : Shortcode
    },
    INVALID_FORMAT : {
        pattern : {  },
        program : PR_FFM_IPC,
        orgUnit : ROOT_OU_UID,
        programStage : PRST_INVALID_FORMAT,
        DE_smsMessage : INVALID_smsMessage,
        DE_shortcode : Shortcode,
        DE_smsTo : INVALID_smsTo
    },
    OM : {
        pattern : { 1 :  "DE_numOfParticipants" },
        program : PR_FFM_IPC,
        programStage : PRST_ORIENTATION_MEETING,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : ProviderCode,
        DE_numOfParticipants : OM_NumOfParticipants,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp
    },
    AM : {
        pattern : { },
        program : PR_FFM_IPC,
        orgUnit : ROOT_OU_UID,
        programStage : PRST_AREA_MAPPING,
        DE_previousMessageField : ProviderCode,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp
    },
    NM : {
        pattern : { 1 : "DE_totalParticipants",
            2 : "DE_tokensIssued"
        },
        program : PR_FFM_IPC,
        programStage : PRST_NEIGBOURHOOD_MEETING,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : ProviderCode,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp,
        DE_totalParticipants : NM_NumOfParticipants,
        DE_tokensIssued : Tokens_Issued
    },
    HH : {
        pattern : { 1 : "DE_lastMawraId",
            2 : "DE_clientsRegistered",
            3 : "DE_tokensIssued"
        },
        program : PR_FFM_IPC,
        programStage : PRST_HOUSEHOLD_VISITS,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : FirstMawraID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp,
        DE_lastMawraId : LastMawraId,
        DE_tokensIssued : Tokens_Issued,
        DE_clientsRegistered : HH_Clients_Registered
    },
    FV : {
        pattern : { 1 : "DE_lastMawraId",
            2 : "DE_clientsRegistered",
            3 : "DE_tokensIssued"
        },
        program : PR_FFM_IPC,
        programStage : PRST_FOLLOWUP_VISITS,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : FirstMawraID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp,
        DE_lastMawraId : LastMawraId,
        DE_tokensIssued : Tokens_Issued,
        DE_clientsRegistered :FV_clientsRegistered
    }

}
