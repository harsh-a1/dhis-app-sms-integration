/**
 * Created by harsh on 30/4/16.
 */

function getToday(format){
    var DateToday = new Date();

    if (format == "YYYY-MM-dd"){
        return  DateToday.getFullYear()+"-"+(DateToday.getMonth().length==1?(parseInt(DateToday.getMonth())+1):"0"+(parseInt(DateToday.getMonth())+1))+"-"+DateToday.getDate();
    }
    return DateToday;
}