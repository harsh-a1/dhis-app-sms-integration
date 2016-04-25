/**
 * Created by hisp on 1/12/15.
 */

skeletonApp
.controller('homeController', function( $rootScope,
                                         $scope,$timeout,
                                        MetadataService,utilityService){

    $scope.MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
    var XML = "<SMSRequest><Username>03028501480</Username><Password>cusit123</Password><Shortcode>7005056</Shortcode><FromDate>2016-04-16 10:00:00</FromDate><ToDate>2016-04-16 11:00:00</ToDate></SMSRequest>"

//    MetadataService.getSMS($scope.MOBILINK,XML).then(function(data){
//debugger
//    })

    var x2js = new X2JS();
    jQuery.get('scripts/data.xml',function(data){
        var json = x2js.xml2json(data);

        $timeout(function(){
            $scope.smsDataGroupedByPhone = utilityService.prepareMapGroupedById(json.SMSRsponse.SMSInfo,"smsFrom");
            $scope.smsDataGroupedByPhone = utilityService.prepareListFromMap( $scope.jsonGrouped);
        })

        function processSMS(smsData,index,providerId){
            if (smsData.length == index){return}

            MetadataService.getTEIByAttribute(ROOT_OU_UID,PHONE_ATTR_UID,smsFrom).then(function(tei){
             if (tei.length>0){
               for (var i=0;i<smsData[index].length;i++){
                    var smsInfo = smsData[index][i];
                    var parsed = messageParser(smsInfo);

                   if (parsed.interpretation == PROVIDER_ID){
                       providerId = parsed.output;
                       continue;
                   }


                }
             }else{console.log("No phone number found.")}

            processSMS(smsData,index+1,providerId);
            })
        }

            // parse sms
            for (var i=0;i<$scope.jsonGrouped.length;i++){
		    var providerId = undefined;

                for (var j=0;j<$scope.jsonGrouped[i].length;){
                    var smsFrom = $scope.jsonGrouped[i][j].smsFrom;
                    var smsMessage = $scope.jsonGrouped[i][j].smsMessage;
                    Smsfrom = smsFrom.substr(1,smsFrom.length);
 
		    var pm = parseMessage(smsMessage);
                    if (pm == PROVIDERID){ //Forward to next state
                        //get ID
			continue;
		    }
                     
                    switch(pm){
                    case IPC : break
                    case SALES : break
                    case HSM : break
		    case INVALID : break
                    default : break

                    }
                    


                }

            }

    })

    });
