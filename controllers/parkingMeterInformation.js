let meters = require('../model/parkingMeters');
let tickets = require('../model/parkingTickets');
let ax = require('axios');

function fetchMeters() {
    ax.get('https://opendata.vancouver.ca/api/v2/catalog/datasets/parking-meters/exports/json?rows=-1&pretty=false&timezone=UTC')
        .then(function (response) {
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

exports.getTable = (req, res) => {
    fetchMeters();
    let information = meters.check();
    let ticket = tickets.parkingTickets();

    /*This is where we fetch the ticket information and start method chaining from the returned 
    promise object.*/
    ax.get('https://opendata.vancouver.ca/api/v2/catalog/datasets/parking-tickets-2017-2019/exports/json?rows=-1&pretty=false&timezone=UTC')
        .then(function (response) {
            //This is the "big" map that contains Street/Block : Year
            //Ex: HOWE ST/800 =>    2017 =>     03 =>       31 =>       2
            //                     (year)     (month)      (day)  (# tickets)
            let ticketMap = new Map();

            //This forEach loop iterates over all of the tickets and maps them.
            response.data.forEach(function (ticket) {
                let ticketStreet = ticket.street;
                let ticketBlock = ticket.block;
                //identifier that will be compared to the parking meter identifier
                //Ex HOWE ST/800
                let streetBlock = "" + ticketStreet + "/" + ticketBlock;
                // ticket date is being split into y/m/d to create progressively more granular objects
                let ticketDate = ticket.entrydate;
                let splitDate = ticketDate.split("-");
                let ticketYear = splitDate[0];
                let ticketMonth = splitDate[1];
                let ticketDay = splitDate[2];
                /*The ticket object is broken down into Year.Month.Day{ticketCount}
                in order to make it easy to progressively add records down the road
                Example: {year: {2018, month: {03, day: {03, 01}}}}
                dateCount is the number of tickets on a particular day. It is 
                initalized to one.*/
                var ticketObject = {
                    year: {
                        ticketYear,
                        month: {
                            ticketMonth,
                            day: {
                                ticketDay,
                                dateCount: 1
                            }
                        }
                    }
                };

                /*This conditional statement begins by asking:
                "Does the map contain this ticket record's streetBlock? (ex HOWE/800)" 
                If not, the conditional adds the whole record to the ticketMap.*/
                if (!ticketMap.has(streetBlock)) {
                    let dayMap = new Map();
                    dayMap.set(ticketDay, ticketObject.year.month.day.dateCount);
                    let monthMap = new Map();
                    monthMap.set(ticketMonth, dayMap);
                    let yearMap = new Map();
                    yearMap.set(ticketYear, monthMap);
                    ticketMap.set(streetBlock, yearMap);
                    /*If a match for the streetBlock is found, then it asks: 
                    "does the map contain a match for this ticket record's year of 
                    infraction?"
                    If not, the conditional adds the record starting at the year to the ticketMap.
                    The year is the key for the rest of the record (month, day, ticket count)*/
                } else {
                    if (!ticketMap.get(streetBlock).has(ticketYear)) {
                        let dayMap = new Map();
                        dayMap.set(ticketDay, ticketObject.year.month.day.dateCount);
                        let monthMap = new Map();
                        monthMap.set(ticketMonth, dayMap);
                        ticketMap.get(streetBlock).set(ticketYear, monthMap);
                        /*If a match for the year is found, it asks whether a match for the
                        ticket record's month has been found. If not, it adds the ticket
                        record to the map starting at the month. The month is a key
                        for the rest of the record. */
                    } else {
                        if (!ticketMap.get(streetBlock).get(ticketYear).has(ticketMonth)) {
                            let dayMap = new Map();
                            dayMap.set(ticketDay, ticketObject.year.month.day.dateCount);
                            ticketMap.get(streetBlock).get(ticketYear).set(ticketMonth, dayMap);
                            /*If a match for the month is found, the conditional asks
                            whether a match for the day is found. If not, it adds
                            the ticket record starting at the day to the month map. The day 
                            is the key to the ticket count for that day.*/
                        } else {
                            if (!ticketMap.get(streetBlock).get(ticketYear).get(ticketMonth).has(ticketDay)) {
                                ticketMap.get(streetBlock).get(ticketYear).get(ticketMonth).set(ticketDay, ticketObject.year.month.day.dateCount);
                                /*At this point, the ticket record matches another ticket record exactly,
                                meaning that the streetBlock, year, month, and date are the same. So,
                                we increment the ticketcount for this day in this street/block. */
                            } else {
                                let ticketCount = ticketMap.get(streetBlock).get(ticketYear).get(ticketMonth).get(ticketDay);
                                ticketCount++;
                                ticketMap.get(streetBlock).get(ticketYear).get(ticketMonth).set(ticketDay, ticketCount);
                            }
                        }
                    }
                }
            });

            function logMapElements(values) {
                console.log(values);
            }
            ticketMap.forEach(logMapElements);
        })
        .catch(function (error) {
            console.log(error);
        });


    res.render('index', {
        street: information,
        ticket: ticket
    });
    // information.then(([rows, fieldData])=>{
    //     res.render('index', {street:rows});

    // });

}