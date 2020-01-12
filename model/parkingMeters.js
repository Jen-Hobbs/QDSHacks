///call json
var information;
var endDate;
var startDate;
function check(){
    console.log("checking check function");
    var streetName = ['one', 'two', 'three'];
    return streetName;
}
function parkingMeters(){
    
}
function setLocations(locations){
    information = locations;
    console.log(information[0]);
}
function getLocations(){
    
    return information;
}
function setTime(end, start){
    endDate = end;
    startDate = start;
}
function getEnd(){
    let startStr = startDate + '';
    let endStr = endDate + '';

    let start = startStr.split('-');
    let end = endStr.split('-');
    console.log(start);
    console.log(end);
    console.log('the month is: ' + end[2]);
    return endDate;
}

module.exports = {
    setLocations: setLocations,
    check : check,
    parkingMeters : parkingMeters,
    getLocations : getLocations,
    setTime : setTime,
    getEnd : getEnd
}