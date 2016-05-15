/**
 * Created by hisp on 1/12/15.
 */

skeletonApp
.controller('homeController', function( $rootScope,
                                         $scope,$timeout,
                                        MetadataService,utilityService){



    $scope.MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
    var XML = "<SMSRequest><Username>03028501480</Username>" +
        "<Password>cusit123</Password><Shortcode>7005056</Shortcode>" +
        "<FromDate>2016-04-16 10:00:00</FromDate>" +
        "<ToDate>2016-04-16 11:00:00</ToDate></SMSRequest>"
    var x2js = new X2JS();
    $timeout(function(){
        $scope.startDate = DateToday;
        $scope.endDate = DateToday;

        $scope.dateToday = DateToday.getFullYear()+"-"+(DateToday.getMonth().length==1?(parseInt(DateToday.getMonth())+1):"0"+(parseInt(DateToday.getMonth())+1))+"-"+DateToday.getDate();
    })

    MetadataService.getCurrentUser().then(function(me) {
    $scope.currentUser = me;
    })
//    MetadataService.getSMS($scope.MOBILINK,XML).then(function(data){
//debugger
//    })
   // importSMS();
    function importSMS(){
    $scope.importSummary = [];
    MetadataService.getCurrentUser().then(function(me){
        var currentUsername = me.displayName;
        jQuery.get('scripts/data.xml',function(data){
            var json = x2js.xml2json(data);

            $timeout(function(){
                $scope.smsDataGroupedByPhone = utilityService.prepareMapGroupedById(json.SMSRsponse.SMSInfo,"smsFrom");
                $scope.smsDataGroupedByPhone = utilityService.prepareListFromMap( $scope.smsDataGroupedByPhone);
                processSMS($scope.smsDataGroupedByPhone, 0,"");
            })

            function processSMS(smsData,index,providerId){
                if (smsData.length == index){return}

                var phone = smsData[index][0].smsFrom;
                phone = phone.substr(1,phone.length);// remove + sign from number

                MetadataService.getTEIByAttribute(ROOT_OU_UID,PHONE_ATTR_UID,phone).then(function(tei){
                    if (tei.length>0){
                        var reportItem = {
                            phone : phone,
                            sms : [],
                            importStatus : "N/A",
                            details : ""
                        }
                        var smsItems =[];

                        var dependencies = {};
                        dependencies.tei =  tei[0];
                        dependencies.userName = currentUsername;

                        parseAndImportMessage(smsData,index,smsItems,dependencies,reportItem);
                        $timeout(function(){
                            $scope.importSummary.push(reportItem);
                        })

                        processSMS(smsData,index+1,providerId);

                    }else{
                        var reportItem = {
                            phone : phone,
                            sms : [{importStatus :INVALID_PHONE, smsDetails : smsData[index][0]}],
                            importStatus : "Phone number not mapped for any entity.",
                            details : ""
                        }
                        $timeout(function(){
                            $scope.importSummary.push(reportItem);
                        });

                        var event = {
                            program : PR_FFM_INVALID,
                            orgUnit: ROOT_OU_UID,
                            eventDate: new Date(smsData[index][0].smsDate),
                            storedBy: currentUsername,
                            dataValues : []
                        }

                            var param = { domain : "",
                                subDomain : "",
                                interpretation:"",
                                operation : "ADD_UPDATE_EVENT_INVALID_PHONE" ,
                                message: "" ,
                                output : event};

                        var invalid_import = importer(param,
                                        {program : FFM_METADATA_MAP["IPC"]["INVALID"].program,
                                        smsDate :smsData[index][0].smsDate.split(" ")[0]     });

                        invalid_import.then(function(data){
                            debugger
                        })
                        console.log("Phone number not mapped for any entity.");
                        processSMS(smsData,index+1,providerId);

                    }

                })
            }
        })
    })
    }

    $timeout(function(){
        $scope.importSMS = importSMS;

    })

    function parseAndImportMessage(smsData,index,smsItems,dependencies,reportItem){
        for (var i=0;i<smsData[index].length;i++) {
            var smsInfo = smsData[index][i];
            dependencies.smsDate = smsInfo.smsDate.split(" ")[0];

            var parsed = messageParser(smsInfo,dependencies);
            if (parsed.subDomain == ONHOLD){

                smsItems.push({smsDetails : smsInfo,importStatus: parsed.subDomain })

                dependencies.prevMessageTimestamp = smsInfo.smsDate;

                if (parsed.interpretation == PROVIDER_ID){
                    dependencies.providerID = parsed.output;
                    continue;
                }
                if (parsed.interpretation == MAWRAID){
                    dependencies.mawraID = parsed.output;
                    continue;
                }
            }

            var importing = importer(parsed,dependencies);
            importing.then(function(response){
                smsItems.push({
                    importStatus : response.message,
                    importDetails : response,
                    smsDetails : smsInfo
                });
                reportItem.sms = smsItems;

            });
        }


    }

    function getSMSDataJson(){
        var def = $.Deferred();
        jQuery.get('scripts/data.xml',function(data){
            var json = x2js.xml2json(data);
             $scope.smsDataGroupedByPhone = utilityService.prepareMapGroupedById(json.SMSRsponse.SMSInfo,"smsFrom");
             $scope.smsDataGroupedByPhone = utilityService.prepareListFromMap( $scope.smsDataGroupedByPhone);
             def.resolve($scope.smsDataGroupedByPhone);
        })
    return def;
    }

    $scope.init = function(){
        state = new StateMachine();
        importSummary = new Summary();

        getSMSDataJson().then(function(data){
           processData(data,0);
        });
    }

    function processData(smsData,index){
        if (smsData.length == index)
        {return}

        var smsList= smsData[index];
        var phone = smsList[0].smsFrom;
        phone = phone.substr(1,phone.length);// remove + sign from number
        importSummary.addRow(phone);
        MetadataService.getTEIByAttribute(ROOT_OU_UID,PHONE_ATTR_UID,phone).then(function(tei){
            if (tei.length>0){
               state.tei = tei[0];
                for (var i=0;i<smsList.length;i++){
                    var sms = smsList[i];

                    importSummary.addSMSDetails(phone,sms);
                    messageParser(state,sms.smsMessage,new Date(sms.smsDate));
                        if (state.currentState == ONHOLD){
                            importSummary.addOnHoldResponse(sms,state);
                            continue;
                        }
                    importHandler(state,sms,callback);

                }

            }else{
            state.changeState(INVALID_PHONE);
                for (var i=0;i<smsList.length;i++){
                    var sms = smsList[i];

                    importSummary.addSMSDetails(phone,sms);
                    importHandler(state,sms,callback);
                }
            }
            setTimeout(function(){
                processData(smsData,index+1);
            },0)

        })
        function callback(response){
            importSummary.addResponse(response);
            $timeout(function(){
                $scope.report = importSummary.report;
            })
        }

    }
    });
