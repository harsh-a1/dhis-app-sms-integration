/**
 * Created by harsh on 22/4/16.
 */

const ONHOLD = "ONHOLD";
const PROVIDER_ID = "providerID";
const MAWRAID = "MawraId";
const ORIENTATION_MEETING = "OM";
const NEIGBOURHOOD_MEETING = "NM";
const BACK_CHECK = "BC";
const HOUSEHOLD_VISIT = "HH";
const AREA_MAPPING = "AM";
const FOLLOW_UP_VISITS = "FV";
const PHONE_ATTR_UID = "SxSh9297ihW";
const ROOT_OU_UID ="tZJsIdHAfKq";
const ADD_UPDATE_EVENT = "add_update_event";
const PRST_ACTIVITY_SUMMARY = "OMHUToxZR03";
const PR_FFM_IPC = "TbYUPaBChYR";

/* Orientation Meeting  */
const PRST_ORIENTATION_MEETING = "kfdip4eQv2m";
const OM_TIMESTAMP = "iEfvgmeshfY";
const OM_NumOfParticipants = "Pusk3tS9CEP";
const OM_Shortcode = "b1gRAuha8v6";
const OM_ProviderCode = "sBD5FEalBsU";
const OM_ProviderTimestamp = "Y43wFzK4je1";

// Create stage for all cases
// Handle invalid messages
// make import summary
// clean xml before arsing
// Java service to fetch data
// Autmatic scheduling of app

const FFM_METADATA_MAP = {
    IPC : {
            OM : {
                pattern : { 1 :  "DE_numOfParticipants" },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : OM_ProviderCode,
                DE_numOfParticipants : OM_NumOfParticipants,
                DE_shortcode : OM_Shortcode,
                DE_providerTimestamp : OM_ProviderTimestamp
              },
            AM : {
                pattern : { },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : AM_ProviderCode,
                DE_shortcode : AM_Shortcode,
                DE_startSMSTimestamp : AM_startSMSTimestamp
            },
            NM : {
                pattern : { 1 : "DE_totalParticipants",
                            2 : "DE_tokensIssued"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : NM_ProviderCode,
                DE_shortcode : NM_Shortcode,
                DE_startSMSTimestamp : NM_startSMSTimestamp,
                DE_totalParticipants : NM_totalParticipants,
                DE_tokensIssued : NM_tokensIssued
            },
            HH : {
                pattern : { 1 : "DE_LastMawraId",
                            2 : "DE_clientsRegistered",
                            3 : "DE_tokensIssued"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : HH_ProviderCode,
                DE_shortcode : HH_Shortcode,
                DE_startSMSTimestamp : HH_startSMSTimestamp,
                DE_LastMawraId : HH_DE_LastMawraId,
                DE_tokensIssued : HH_tokensIssued
            },
            FV : {
                pattern : { 1 : "DE_LastMawraId",
                            2 : "DE_clientsRegistered",
                            3 : "DE_tokensIssued"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : FV_ProviderCode,
                DE_shortcode : FV_Shortcode,
                DE_startSMSTimestamp : FV_startSMSTimestamp,
                DE_LastMawraId : FV_DE_LastMawraId,
                DE_tokensIssued : FV_tokensIssued
            },
            BC : {
                pattern : { 1 : "DE_staffCode",
                            2 : "DE_noOfBackChecks"
                            },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_providerCode : BC_ProviderCode,
                DE_shortcode : BC_Shortcode,
                DE_startSMSTimestamp : BC_startSMSTimestamp,
                DE_noOfBackChecks : BC_DE_noOfBackChecks,
                DE_staffCode : BC_DE_staffCode
        }


          },
    SALES : [],
    HS : []
}
