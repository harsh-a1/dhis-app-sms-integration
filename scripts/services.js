/**
 * Created by hisp on 2/12/15.
 */

var skeletonAppServices = angular.module('skeletonAppServices', [])
    .service('MetadataService',function(){
       return {
           getOrgUnit : function(id){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../organisationUnits/'+id+".json",
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               return def;
           },
           getSMS : function(data){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "jsonp",
                   crossDomain: true,
                   data : "xmldoc="+data,
                   jsonpCallback: 'response',
                   url: "http://221.132.117.58:7700/receivesms_xml_json.php",
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               function response (data) {
                   //alert(data);

                   console.log(data);
               }
               return def;
           },
           getTEIByAttribute : function(rootOU,attr,value){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../trackedEntityInstances?ou='+rootOU+'&ouMode=DESCENDANTS&filter='+attr+':eq:'+value,
                   success: function (data) {
                       def.resolve(data.trackedEntityInstances);
                   }
               });
               return def;
           },
           getCurrentUser : function(){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../me.json?fields=id,displayName',
                   success: function (data) {

                       def.resolve(data);
                   }
               });
               return def;
           },
           testJsonp : function(){
               debugger
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   contentType: "application/json",
                   crossDomain: true,
                   dataType:"json",
                   headers: {
                       "Authorization": "Basic " + btoa("admin" + ":" + "district")
                   },
                   url: 'https://play.dhis2.org/demo/api/me.json?fields=id,displayName',
                   success: function (data) {
debugger
                       def.resolve(data);
                   },error:function(response){
                       debugger
                   }
               });
               return def;
           }
       }
    })
.service('utilityService', function () {

    return {
        prepareIdToObjectMap : function(object,id){
            var map = [];
            for (var i=0;i<object.length;i++){
                map[object[i][id]] = object[i];
            }
            return map;
        },
        prepareDataElementIdToObjectMap : function(object,id){
            var map = [];

            for (var i=0;i<object.length;i++){
                map[object[i].dataElement.id] = object[i];
            }
            return map;
        },
        prepareIdToValueMap: function(object,id,value){
            var map = [];
            for (var i=0;i<object.length;i++){
                map[object[i][id]] = value;
            }
            return map;
        },
        populateValue: function(object,id,value){
            for (var i=0;i<object.length;i++){
                object[i][id] = value;
            }
            return object;
        },
        prepareMapGroupedById: function(object,id){
            var map = [];
            for (var i=0;i<object.length;i++){
                if (!map[object[i][id]]){
                    map[object[i][id]] = [];
                }
                map[object[i][id]].push(object[i]);
            }
            return map;
        },
        prepareListFromMap: function(map){
          return prepareListFromMap(map);
        },
        sort : function(data){
            for (var key in data){
                data[key].sort(function(a,b){
                    var aDate = new Date(a.smsDate);
                    var bDate = new Date(b.smsDate);
                    if ( aDate == bDate){
                        return 0
                    }else if (aDate > bDate)
                    { return 1
                    }else if (aDate < bDate){
                        return -1;
                    }
                })
            }
            return data;
        }
    }
})

