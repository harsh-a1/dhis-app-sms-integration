/**
 * Created by harsh on 22/4/16.
 */

const DateToday = new Date();

// interpretations
const ONHOLD = "ONHOLD";
const PROVIDER_ID = "providerID";
const MAWRAID = "MawraId";
const INVALID_FORMAT = "INVALID_FORMAT";
const INVALID_PHONE = "INVALID_PHONE";

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
const PR_FFM_IPC = "TbYUPaBChYR";
const PR_FFM_INVALID_MESSAGE = "";

//Program Stages
const PRST_ORIENTATION_MEETING = "OMHUToxZR03";
const PRST_NEIGBOURHOOD_MEETING = "mDwBhWDmLfr";
const PRST_HOUSEHOLD_VISITS = "n2CFuvwUvnh";
const PRST_AREA_MAPPING = "k7gHjJ4LFOU";
const PRST_FOLLOWUP_VISITS = "hVVdocIy72g";
const PRST_INVALID_MESSAGE = "";

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
const INVALID_smsMessage = "";
const INVALID_smsTo = "";

// Create stage for all cases
// Handle invalid messages
// make import summary
// clean xml before arsing
// Java service to fetch data
// Autmatic scheduling of app

const FFM_METADATA_MAP = {
    IPC : {
            INVALID_PHONE :{
                pattern : {  },
                program : PR_FFM_INVALID_MESSAGE,
                DE_smsMessage : INVALID_smsMessage,
                DE_shortcode : Shortcode,
                DE_smsTo : INVALID_smsTo
            },
            INVALID_FORMAT : {
                pattern : {  },
                program : PR_FFM_IPC,
                programStage : PRST_INVALID_MESSAGE,
                DE_smsMessage : INVALID_smsMessage,
                DE_shortcode : Shortcode,
                DE_smsTo : INVALID_smsTo
            },
            OM : {
                pattern : { 1 :  "DE_numOfParticipants" },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_previousMessageField : ProviderCode,
                DE_numOfParticipants : OM_NumOfParticipants,
                DE_shortcode : Shortcode,
                DE_previousMessageTimestamp : PreviousMessageTimestamp
              },
            AM : {
                pattern : { },
                program : PR_FFM_IPC,
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
                DE_previousMessageField : ProviderCode,
                DE_shortcode : Shortcode,
                DE_previousMessageTimestamp : PreviousMessageTimestamp,
                DE_totalParticipants : NM_NumOfParticipants,
                DE_tokensIssued : Tokens_Issued
            },
            HH : {
                pattern : { 1 : "DE_LastMawraId",
                            2 : "DE_clientsRegistered",
                            3 : "DE_tokensIssued"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_HOUSEHOLD_VISITS,
                DE_previousMessageField : FirstMawraID,
                DE_shortcode : Shortcode,
                DE_previousMessageTimestamp : PreviousMessageTimestamp,
                DE_LastMawraId : LastMawraId,
                DE_tokensIssued : Tokens_Issued,
                DE_clientsRegistered : HH_Clients_Registered
            },
            FV : {
                pattern : { 1 : "DE_LastMawraId",
                            2 : "DE_clientsRegistered",
                            3 : "DE_tokensIssued"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_FOLLOWUP_VISITS,
                DE_previousMessageField : FirstMawraID,
                DE_shortcode : Shortcode,
                DE_previousMessageTimestamp : PreviousMessageTimestamp,
                DE_LastMawraId : LastMawraId,
                DE_tokensIssued : Tokens_Issued,
                DE_clientsRegistered :FV_clientsRegistered
            }
        //    BC : {
        //        pattern : { 1 : "DE_staffCode",
        //                    2 : "DE_noOfBackChecks"
        //                    },
        //        program : PR_FFM_IPC,
        //        programStage : PRST_ORIENTATION_MEETING,
        //        DE_providerCode : BC_ProviderCode,
        //        DE_shortcode : BC_Shortcode,
        //        DE_startSMSTimestamp : BC_startSMSTimestamp,
        //        DE_noOfBackChecks : BC_DE_noOfBackChecks,
        //        DE_staffCode : BC_DE_staffCode
        //}


          },
    SALES : [],
    HS : []
}
