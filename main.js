/**
 * Created by HISP on 9/3/2016.
 */

var moment = require("moment");
var Q = require("q");

var CONSTANTS = require("./scripts/constants");

var ajax = require('./scripts/refactor/ajax-calls');
var MOBILINK = "http://221.132.117.58:7700/receivesms_xml.php";
var startDate = new Date();
var endDate = new Date();

var XML = "<SMSRequest><Username>03028501480</Username>" +
    "<Password>cusit123</Password><Shortcode>7005056</Shortcode>" +
    "<FromDate>"+moment(startDate).format("YYYY-MM-DD HH:m:s")+"</FromDate>" +
    "<ToDate>"+moment(endDate).format("YYYY-MM-DD HH:m:s")+"</ToDate></SMSRequest>";


function init(){
  getDataFromMobilink(XML).then(function(){

  })
}

function getDataFromMobilink(XML){
  var def = Q.defer();

  ajax.getReqJSONP(MOBILINK,XML,callback);
  function callback(error,response,body){
    console.log(body)
    var xmlStr = "";
    for (var i in data){
      xmlStr = xmlStr+data[i];
    }

    xmlStr = cleanXML(xmlStr);

    var xml = $.parseXML("<root>"+xmlStr+"</root>");
    var jsonData = x2js.xml2json(xml);
    def.resolve(jsonData.root);
  }
  return def.promise;
}

init();