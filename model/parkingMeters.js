///call json
var information;
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
function getLocations(dateStart, dateEnd){
    console.log(information);
    let info = [];
    let count = 0;
    if(dateStart != null && dateEnd !== null){
        for(let x = dateStart; x <= dateEnd; x++){
            info[count] = information[x];
        }
    }
    return info;
}
module.exports = {
    setLocations: setLocations,
    check : check,
    parkingMeters : parkingMeters,
    getLocations : getLocations
}