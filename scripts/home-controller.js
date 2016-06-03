/**
 * Created by hisp on 1/12/15.
 */

skeletonApp
.controller('homeController', function( $rootScope,
                                         $scope,$timeout,
                                        MetadataService,utilityService){



    $scope.MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
    $scope.skipInvalid = true;
    var x2js = new X2JS();
    $timeout(function(){
        $scope.startDate = DateToday;
        $scope.endDate = DateToday;

        $scope.dateToday = DateToday.getFullYear()+"-"+(DateToday.getMonth().length==1?(parseInt(DateToday.getMonth())+1):"0"+(parseInt(DateToday.getMonth())+1))+"-"+DateToday.getDate();
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

            xmlStr = cleanXML(xmlStr)

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
                if(json.SMSRsponse.Error)
                    alert(json.SMSRsponse.Error);
                return
            }
             $scope.smsDataGroupedByPhone = utilityService.prepareMapGroupedById(json.SMSInfo,"smsFrom");
             $scope.smsDataGroupedByPhone = utilityService.prepareListFromMap( $scope.smsDataGroupedByPhone);
             def.resolve($scope.smsDataGroupedByPhone);
        })
    return def;
    }

    $scope.init = function(){
        if (!$scope.startDate && !$scope.endDate){
            alert("Please select both start and end date");
            return
        }

        state = new StateMachine();
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
                    importHandler(state,sms,callback,$scope.skipInvalid);
                }
            }else{
            state.changeState(INVALID_PHONE);
                for (var i=0;i<smsList.length;i++){
                    var sms = smsList[i];

                    importSummary.addSMSDetails(phone,sms);
                    importHandler(state,sms,callback,$scope.skipInvalid);
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
    });
