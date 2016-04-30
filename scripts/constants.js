/**
 * Created by harsh on 22/4/16.
 */

const PROVIDER_ID = "providerID";
const ORIENTATION_MEETING = "OM";
const NEIGBOURHOOD_MEETING = "NM";
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


const FFM_METADATA_MAP = {
    IPC : {
            OM : {
                pattern : { 1 :  "DE_numOfParticipants" },
                program : PR_FFM_IPC,
                programStage : PRST_ORIENTATION_MEETING,
                DE_timestamp : OM_TIMESTAMP,
                DE_providerCode : OM_ProviderCode,
                DE_numOfParticipants : OM_NumOfParticipants,
                DE_shortcode : OM_Shortcode
              }
          },
    SALES : [],
    HS : []
}
