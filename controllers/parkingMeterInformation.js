let meters = require('../model/parkingMeters');
let tickets = require('../model/parkingTickets');

exports.getTable = (req,res) => {
    let information = meters.check();

    let ticket = tickets.parkingTickets();
    res.render('index', {street: information, ticket: ticket});
    // information.then(([rows, fieldData])=>{
    //     res.render('index', {street:rows});

    // });

}
