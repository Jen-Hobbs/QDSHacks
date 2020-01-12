///call json
var information;
var endDate;
var startDate;
var mapLocations;
var currentData;
let start;
let end;
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

    start = startStr.split('-');
    end = endStr.split('-');
    if(mapLocations != undefined){
        console.log("map locations is not undefined")
        mapLocations.forEach(function(values, key){
            //console.log(key);
            
            for(var x = parseInt(start[0]); x <= parseInt(end[0]); x++){
                 if(values.yearMap.has(x.toString())){                    
                     if(x.toString() == start[0].toString() && x.toString() == end[0].toString()){
                        for(var i = parseInt(start[1]); i <= parseInt(end[1]); i++){
                            console.log(i);
                            if(values.yearMap.get(x.toString()).has(i)){
                                console.log("hello");
                            }
                            
                        }
                     }
                     else if(x.toString() == start[0].toString()){
                        
                     }
                     else if(x.toString() == end[0].toString()){

                     }
                     else{

                        
                     }
                    // console.log(values.yearMap.get(x.toString()));
            //         if(values.yearMap.get(x).has('01')){
                
            //         streetInfo.push(key);
            //         console.log("information");
            //         console.log(values.yearMap.get(x).has('01'));
            //         //console.log("information ");
            //         // console.log(values.yearMap.get('2019').get('01').get('26'));
            //         let count = 0;
            //         values.yearMap.get(x).get('01').forEach(function(values){
            //             //console.log(values);
            //             count += values;
            //         });
            //         countInfo.push(count);
            //         //console.log("total count is " + count);
            //         //values.yearMap.get('2019').get('01').get('26');
                
            //     // console.log(key);
            //     // values.yearMap.get('2019').get('01').forEach(displayCount);
            //     //console.log(values.yearMap.get('2019').get('01'));
            }
            
             }
    // }
        });
    }
    console.log(start);
    console.log(end);
    console.log('the month is: ' + end[2]);
    //console.log(mapLocations);

    

    // if(mapLocations != undefined){
    //     mapLocations.forEach(display);

    // }
    return mapLocations;
}




// var allInfo = [];

// for(let x = 0; x < streetInfo.length; x++){
    
//     // let street = streetInfo[x];
//     // allInfo.push(street);
//     var street = {street_name : streetInfo[x], amount : countInfo[x]};
    
//     allInfo.push(street);
// }


function setMap(mapInfo){
    mapLocations = mapInfo;
}
function display(values, key){
    // console.log('values ' + values);
    // if(values.has('2019')){
    //     console.log('keyvalue' + values + ' ' + key);
        
    // }
    
}



module.exports = {
    setMap: setMap,
    setLocations: setLocations,
    check : check,
    parkingMeters : parkingMeters,
    getLocations : getLocations,
    setTime : setTime,
    getEnd : getEnd
}