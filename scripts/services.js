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
           getSMS : function(url,data){
               var def = $.Deferred();
               $.ajax({
                   type: "POST",
                   dataType: "xml",
                   crossDomain: true,
                   contentType: "application/xml",
                   data : data,
                   url: url,
                   success: function (data) {
                       def.resolve(data);
                   }
               });
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
            var list = [];
            for (var key in map){
                list.push(map[key]);
            }
            return list;
        }
    }
})

