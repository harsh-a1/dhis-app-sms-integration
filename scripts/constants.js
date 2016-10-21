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
const INVALID_PAIR = "INVALID_PAIR";

// Sub Domains
const ORIENTATION_MEETING = "OM";
const NEIGBOURHOOD_MEETING = "NM";
const BACK_CHECK = "BC";
const HOUSEHOLD_VISITS = "HH";
const AREA_MAPPING = "AM";
const FOLLOW_UP_VISITS = "FV";
const SUPERVISORY_SUPPORT_ORIENTATION_MEETING= "SSO";
const SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING = "SSN";
const SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT = "SSH";
const TRAINING = "TR"; //for IPC program
const MEETING = "MTG"; //for IPC program
const LEAVE = "OL"; //for IPC program
const TRAINING_SUPERVISOR = "TRSUPER"; // for supervisor program
const MEETING_SUPERVISOR = "MTGSUPER"; // for supervisor prog
const LEAVE_SUPERVISOR = "OLSUPER"; // for supervisor prog
const TRAINING_AM = "TRAM"; // for AM program
const MEETING_AM = "MTGAM";// for AM program
const LEAVE_AM = "OLAM";// for AM program



// Operational mappings
const PHONE_ATTR_UID = "SxSh9297ihW";
const ROOT_OU_UID ="tZJsIdHAfKq";
const ADD_UPDATE_EVENT = "add_update_event";
const ADD_UPDATE_EVENT_INVALID = "ADD_UPDATE_EVENT_INVALID";
const ADD_UPDATE_EVENT_INVALID_PHONE = "ADD_UPDATE_EVENT_INVALID_PHONE";
const PR_FFM_IPC = "TbYUPaBChYR";
const PR_FFM_SUPERVISOR ="kHRsNFOgLN2";
const PR_FFM_AM ="ghe98M1z5s7";
const PR_FFM_INVALID = "QjQT4k8M4ma";

//Program Stages
const PRST_ORIENTATION_MEETING = "OMHUToxZR03";
const PRST_NEIGBOURHOOD_MEETING = "mDwBhWDmLfr";
const PRST_HOUSEHOLD_VISITS = "n2CFuvwUvnh";
const PRST_AREA_MAPPING = "k7gHjJ4LFOU";
const PRST_FOLLOWUP_VISITS = "hVVdocIy72g";
const PRST_INVALID_FORMAT = "CCEEqcvtLjA";
const PRST_INVALID = "pmj1wbykdGj";
const PRST_ORIENTATION_MEETING_WITH_PROVIDER = "cl1PtRoB3uu";
const PRST_SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING  = "gYaaS7ZgLQ3";
const PRST_BACK_CHECKS = "XvHb30rWm8b";
const PRST_SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT = "qAnwuzymSvu";
const PRST_TRAINING_IPC = "MxHjgrTCsnB";
const PRST_MEETING_IPC ="bLZzC5x8IBn";
const PRST_LEAVE_IPC ="n0RPVGCbi7D";
const PRST_TRAINING_SUPERVISOR ="luZIG1Br7dP";
const PRST_MEETING_SUPERVISOR ="zdLmctzOaGI";
const PRST_LEAVE_SUPERVISOR ="Oe6ck6a30DA";
const PRST_TRAINING_AM ="UAO8Ed8kp5r";
const PRST_MEETING_AM ="wUqieTuXJHC";
const PRST_LEAVE_AM ="HZEsL4JTJZk";

/* Common */
const ProviderCode = "sBD5FEalBsU";
const Shortcode = "Jtty2PVrrjn";
const PreviousMessageTimestamp = "ILL6OzRVVrF";
const FirstMawraID = "qbK1eGEgVD4";
const Tokens_Issued = "gBdx1XMCySe";
const LastMawraId = "vKpDeWYKhHk";
const IPCCode = "RsuC8i6NWFF";


/* Orientation Meeting  */
const OM_NumOfParticipants = "Pusk3tS9CEP";

/* Neighbourhood Meeting  */
const NM_NumOfParticipants = "dvLvzUaJeQh";

/*Household Visits*/
const HH_Clients_Registered = "nUqWTyxWCZs";

/*Follow Up Visits*/
const FV_clientsRegistered = "NoGwMfqdSOY";

/*Orientation meeting with provider*/
const SSO_NumOfParticipants ="Pusk3tS9CEP";

/*Supervisory support of Neighbourhood Meeting */
const SSN_NumOfMawra ="jQXsLw6MhVv";
const SSN_NumOfMen = "Dd8Vn4QybC6";
const SSN_NumOfMotherInLaw = "hR891IT7kV8";

/*Back Checks*/
const BC_NumOfBackChecks ="WWmfTaEY5Fh";

/*Supervisory support of Household visits*/
const SSH_clientsRegistered = "nUqWTyxWCZs";

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
    INVALID_PAIR : {
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
    },

    SSO:{
        pattern : { 1 :  "DE_numOfParticipants" },
        program : PR_FFM_SUPERVISOR,
        programStage : PRST_ORIENTATION_MEETING_WITH_PROVIDER,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : IPCCode,
        DE_numOfParticipants : SSO_NumOfParticipants,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    SSN: {
        pattern : { 1 :  "DE_numOfMawra" ,
        2 : "DE_numOfMen",
        3 : "DE_numOfMotherInLaw" },
        program : PR_FFM_SUPERVISOR,
        programStage : PRST_SUPERVISORY_SUPPORT_NEIGBOURHOOD_MEETING,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : IPCCode,
        DE_numOfMawra : SSN_NumOfMawra,
        DE_numOfMen : SSN_NumOfMen,
        DE_numOfMotherInLaw : SSN_NumOfMotherInLaw,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp


    },

    BC: {
        pattern : { 1 : "DE_previousMessageField",
            2 : "DE_numOfBackChecks"
        },
        program : PR_FFM_SUPERVISOR ,
        programStage: PRST_BACK_CHECKS,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : IPCCode,
        DE_IPCCode : IPCCode,
        DE_numOfBackChecks : BC_NumOfBackChecks,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    SSH: {
        pattern : { 1 : "DE_lastMawraId",
            2 : "DE_clientsRegistered"

        },
        program : PR_FFM_SUPERVISOR,
        programStage : PRST_SUPERVISORY_SUPPORT_HOUSEHOLD_VISIT,
        orgUnit : ROOT_OU_UID,
        DE_previousMessageField : FirstMawraID,
        DE_lastMawraId : LastMawraId,
        DE_clientsRegistered :SSH_clientsRegistered,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp,
    },

    TR: {
        program : PR_FFM_IPC ,
        programStage: PRST_TRAINING_IPC,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    MTG: {
        program : PR_FFM_IPC ,
        programStage: PRST_MEETING_IPC,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    OL: {
        program : PR_FFM_IPC ,
        programStage: PRST_LEAVE_IPC,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    TRSUPER: {
        program : PR_FFM_SUPERVISOR ,
        programStage: PRST_TRAINING_SUPERVISOR,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    MTGSUPER: {
        program : PR_FFM_SUPERVISOR ,
        programStage: PRST_MEETING_SUPERVISOR,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    OLSUPER: {
        program : PR_FFM_SUPERVISOR ,
        programStage: PRST_LEAVE_SUPERVISOR,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    TRAM: {
        program : PR_FFM_AM ,
        programStage: PRST_TRAINING_AM,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    MTGAM: {
        program : PR_FFM_AM ,
        programStage: PRST_MEETING_AM,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    },

    OLAM: {
        program : PR_FFM_AM ,
        programStage: PRST_LEAVE_AM,
        orgUnit : ROOT_OU_UID,
        DE_shortcode : Shortcode,
        DE_previousMessageTimestamp : PreviousMessageTimestamp

    }

}
