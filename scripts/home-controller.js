/**
 * Created by hisp on 1/12/15.
 */

skeletonApp
.controller('homeController', function( $rootScope,
                                         $scope,$timeout,
                                        MetadataService,utilityService){

    $scope.showMsgToUser = false;

    duration = 1;
   //scheduleImport();
    function scheduleImport(){
        var sched = later.parse.recur().every(duration).minute(),
            t = later.setInterval(scheduler, sched)
    }

    function scheduler(){
        $timeout(function(){
            $scope.startDate = new Date(moment(new Date()).
            subtract({'minutes':duration}).format("YYYY-MM-DD HH:m:s"));

            $scope.endDate = new Date(moment(new Date()).
            format("YYYY-MM-DD HH:m:s"));
            console.log("Import  -"+new Date())
            init();
        },10)

    }
    $scope.init =init;
        $scope.MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
    $scope.skipInvalid = true;
    $scope.skipIPC = false;
    $scope.skipSales = true;
    $scope.skipHS = true;

    $scope.loading = false;
    var x2js = new X2JS();
    $timeout(function(){
        $scope.startDate = DateToday;
        $scope.endDate = DateToday;
      //  $scope.dateToday = DateToday.getFullYear()+"-"+(DateToday.getMonth().length==1?(parseInt(DateToday.getMonth())+1):"0"+(parseInt(DateToday.getMonth())+1))+"-"+DateToday.getDate();
        $scope.dateToday = new Date();
        //scheduler();

    })

    MetadataService.getCurrentUser().then(function(me) {
    $scope.currentUser = me;
    })


    function getDataFromMobilink(XML){
        var def = $.Deferred();

        MetadataService.getSMS(XML).then(function(data){
            var xmlStr = "";
            for (var i in data){
                xmlStr = xmlStr+data[i];
            }

            xmlStr = cleanXML(xmlStr);

            var xml = $.parseXML("<root>"+xmlStr+"</root>");
            var jsonData = x2js.xml2json(xml);
            def.resolve(jsonData.root);
        });
        return def;
    }

    function getSMSDataJson(XML){
        var def = $.Deferred();
        getDataFromMobilink(XML).then(function(json){

            if (json.SMSRsponse){
                if(json.SMSRsponse.Error){
                    $scope.showMsgToUser = true;
                    $scope.messageToUser = json.SMSRsponse.Error;
                }
                stopLoader();
                return
            }
             $scope.smsDataGroupedByPhone = utilityService.prepareMapGroupedById(json.SMSInfo,"smsFrom");
             $scope.smsDataGroupedByPhone = utilityService.sort($scope.smsDataGroupedByPhone);

            $scope.smsDataGroupedByPhone = utilityService.prepareListFromMap( $scope.smsDataGroupedByPhone);

            //printList($scope.smsDataGroupedByPhone)
            def.resolve($scope.smsDataGroupedByPhone);
        })
    return def;
    }

    function printList(smsDataGroupedByPhone){
        for (var i=0;i<smsDataGroupedByPhone.length;i++){
            for (var j=0;j<smsDataGroupedByPhone[i].length;j++){
                console.log(smsDataGroupedByPhone[i][j].smsDate);
            }
        }
        debugger
    }
    function init(){
        if (!$scope.startDate && !$scope.endDate){
            $timeout(function(){
                $scope.showMsgToUser = true;
                $scope.messageToUser = "Please select dates";
                return
            })
        }

        $scope.showMsgToUser = false;
        $scope.loading = true;

        state = new StateMachine();

        state.skipCriteria ={};
        state.skipCriteria[DOMAIN_IPC] = $scope.skipIPC;
        state.skipCriteria[DOMAIN_SALES] = $scope.skipSales;
        state.skipCriteria[DOMAIN_HS] = $scope.skipHS;
        state.skipCriteria[DOMAIN_INVALID] = $scope.skipInvalid;

        importSummary = new Summary();

        var XML = "<SMSRequest><Username>03028501480</Username>" +
            "<Password>cusit123</Password><Shortcode>7005056</Shortcode>" +
            "<FromDate>"+moment($scope.startDate).format("YYYY-MM-DD HH:m:s")+"</FromDate>" +
            "<ToDate>"+moment($scope.endDate).format("YYYY-MM-DD HH:m:s")+"</ToDate></SMSRequest>";

        getSMSDataJson(XML).then(function(data){
           processData(data,0);
        });
    }

    function processData(smsData,index){
        if (smsData.length == index)
        {
            stopLoader();
            return
        }

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
                            state.pairReady = true;
                            importSummary.addOnHoldResponse(phone,sms,state);
                            continue;
                        }
                    if (state.pairReady){
                        importHandler(Object.assign({},state),sms,callback);
                        state.pairReady=false;
                    }else{
                        state.changeState(INVALID_PAIR);
                        importHandler(Object.assign({},state),sms,callback);
                    }
                }
            }else{
                state.changeState(INVALID_PHONE);
                for (var i=0;i<smsList.length;i++){
                    var sms = smsList[i];

                    importSummary.addSMSDetails(phone,sms);
                    importHandler(Object.assign({},state),sms,callback);
                }
            }
            setTimeout(function(){
                processData(smsData,index+1);
            },10)
        })

        function callback(response){
            importSummary.addResponse(response);
            $timeout(function(){
                $scope.report = importSummary.report;
            })
        }

    }

    function stopLoader(){
        $timeout(function(){
            $scope.loading = false;
        })
    }
    });
