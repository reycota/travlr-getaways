const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

//GET /trips - return all trips as JSON
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        res
            .status(200)
            .json(trips);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error retrieving trips', error: err});
    }
};

//Export methods
module.exports = {
    tripsList
};