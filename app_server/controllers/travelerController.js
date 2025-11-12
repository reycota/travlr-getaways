const trips = require('../../data/trips.json');

module.exports = {
    listTrips: (req, res) => {
        res.render('travel', {
            title: 'Travlr - Trips', 
            trips: trips
        });
    }
};