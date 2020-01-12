let meters = require('../model/parkingMeters');
let tickets = require('../model/parkingTickets');
let ax = require('axios');

function fetchMeters() {
    ax.get('https://opendata.vancouver.ca/api/v2/catalog/datasets/parking-meters/exports/json?rows=-1&pretty=false&timezone=UTC')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

exports.getTable = (req,res) => {
    fetchMeters();
    let information = meters.check();

    let ticket = tickets.parkingTickets();

    ax.get('https://opendata.vancouver.ca/api/v2/catalog/datasets/parking-tickets-2017-2019/exports/json?rows=2000&pretty=false&timezone=UTC')
        .then(function (response) {
            
            let ticketMap = new Map();

            response.data.forEach(function (ticket) {
                let ticketStreet = ticket.street;
                let ticketBlock = ticket.block;
                //identifier that will be compared to the parking meter identifier
                let streetBlock = "" + ticketStreet + "/" + ticketBlock;

                // ticket date is being split into y/m/d to create progressively more granular objects
                let ticketDate = ticket.entrydate;
                let splitDate = ticketDate.split("-");
                let ticketYear = splitDate[0];


                let ticketMonth = splitDate[1];


                let ticketDay = splitDate[2];


                // console.log("Street Block: " + streetBlock + " Year: " + ticketYear + " Month: " + ticketMonth + " Day: " + ticketDay);
                
                var ticketObject = {
                    ticketYear : { ticketYear,
                        ticketMonth : { ticketMonth,
                            ticketDay : { ticketDay,
                                dateCount : 1
                            }
                        }
                    }
                };

                if(!ticketMap.has(streetBlock)) {
                    ticketMap.set(streetBlock, ticketObject);
                } else {
                    // console.log(streetBlock);
                }

            });
            function logMapElements(values) {
                // console.log(values.ticketYear.ticketMonth.ticketDay.dateCount);
            }
            ticketMap.forEach(logMapElements);
        })
        .catch(function (error) {
            console.log(error);
        });
        

    res.render('index', {street: information, ticket: ticket});
    // information.then(([rows, fieldData])=>{
    //     res.render('index', {street:rows});

    // });

}
