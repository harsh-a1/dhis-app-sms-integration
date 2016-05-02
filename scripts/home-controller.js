/**
 * Created by hisp on 1/12/15.
 */

skeletonApp
.controller('homeController', function( $rootScope,
                                         $scope,$timeout,
                                        MetadataService,utilityService){

    $scope.MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
    var XML = "<SMSRequest><Username>03028501480</Username><Password>cusit123</Password><Shortcode>7005056</Shortcode><FromDate>2016-04-16 10:00:00</FromDate><ToDate>2016-04-16 11:00:00</ToDate></SMSRequest>"
    var x2js = new X2JS();

    $scope.importSummary = [{sms : "",
                             result : "",
                             response : ""   }]
//    MetadataService.getSMS($scope.MOBILINK,XML).then(function(data){
//debugger
//    })

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
                        var dependencies = {};
                        dependencies.tei =  tei[0];
                        dependencies.userName = currentUsername;

                        for (var i=0;i<smsData[index].length;i++) {
                            var smsInfo = smsData[index][i];
                            dependencies.smsDate = smsInfo.smsDate.split(" ")[0];

                            var parsed = messageParser(smsInfo,dependencies);

                            if (parsed.subDomain == ONHOLD){
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

                            var imported = importer(parsed,dependencies);
                        }

                    }else{console.log("No phone number found.")}

                    processSMS(smsData,index+1,providerId);
                })
            }
        })
    })
    });
