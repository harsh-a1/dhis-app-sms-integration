/**
 * Created by harsh on 7/5/16.
 */


prepareIdToObjectMap = function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        map[object[i][id]] = object[i];
    }
    return map;
}

prepareMapGroupedById= function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        if (!map[object[i][id]]){
            map[object[i][id]] = [];
        }
        map[object[i][id]].push(object[i]);
    }
    return map;
}

prepareListFromMap= function(map){
    var list = [];
    var keys = [];
    for (var key in map){
        keys.push(key);
    }
    keys.sort();
    for (var key in keys){
        list.push(map[keys[key]]);
    }

    return list;
}

function findConflicts(response){

    if (response.responseText){
        var jsonRT = JSON.parse(response.responseText);
        if (jsonRT.response.conflicts){
            return jsonRT.response.conflicts;
        }
        if (jsonRT.response.importSummaries[0].conflicts){
            return jsonRT.response.importSummaries[0].conflicts;
        }
        if (jsonRT.response.importSummaries[0].status == "ERROR"){
            return ([{object:jsonRT.response.importSummaries[0].description,value:""}]);
        }
    }else{
        if (response.httpStatus){
            if (response.httpStatus.response){
                if (response.httpStatus.response.conflicts){
                    return response.httpStatus.response.conflicts;
                }
            }
        }

    }

    return NOT_APPLICABLE;
}

function findReference(response){

    if (response.reference){
        return response.reference;
    }
    if (response.response){

        if (response.response && response.response.reference){
            return response.response.reference;
        }

        if (response.response.importSummaries ){
            if (response.response.importSummaries[0].reference)
                return response.response.importSummaries[0].reference;
        }
    }
return NOT_APPLICABLE;
}

function findStatus(response){

    return response.status;
}

function cleanXML(data,property){

    function replaceInvalidChar(index,value){
        data = data.substring(0,occurencesStartTag[i]+startTag.length+index)+value+data.substring(occurencesStartTag[i]+startTag.length+index+1,data.length)
    }

    var startTag = "<smsMessage>";
    var endTag = "</smsMessage>";

    var occurencesStartTag = getIndicesOf(startTag,data,true);
    var occurencesEndTag = getIndicesOf(endTag,data,true);

    for (var i=0;i<occurencesStartTag.length;i++){
        var msg = data.substring(occurencesStartTag[i]+startTag.length,occurencesEndTag[i]);

        var index1 = getIndicesOf(">",msg,true);
        var index2 = getIndicesOf("<",msg,true);
        var index3 = getIndicesOf("&",msg,true);
        var index4 = getIndicesOf("\"",msg,true);
        var index5 = getIndicesOf("'",msg,true);

        if ( index1.length != 0){
            for (var key in index1){
                replaceInvalidChar(index1[key],".");
            }
        }
        if ( index2.length != 0){
            for (var key in index2){
                replaceInvalidChar(index2[key],".");
            }
        }
        if ( index3.length != 0){
            for (var key in index3){
                replaceInvalidChar(index3[key],".");
            }
        }
        if ( index4.length != 0){
            for (var key in index4){
                replaceInvalidChar(index4[key],".");
            }
        }
        if ( index5.length != 0){
            for (var key in index5){
                replaceInvalidChar(index5[key],".");
            }
        }

    }
    data = data.replaceAll('\0','');

    return data;
}

function getIndicesOf(searchStr, str, caseSensitive) {
    //http://stackoverflow.com/a/3410557/4989935
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};