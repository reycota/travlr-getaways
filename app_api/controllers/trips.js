const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /trips - return all trips as JSON
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        res
            .status(200)
            .json(trips);
    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error retrieving trips', error: err });
    }
};

// GET /trips/:tripId - return a single trip as JSON
const tripsReadOne = async (req, res) => {
    const tripId = req.params.tripId;

    if (!tripId) {
        return res
            .status(400)
            .json({ message: 'Trip ID is required' });
    }

    try {
        const trip = await Trip.findById(tripId).exec();

        if (!trip) {
            return res
                .status(404)
                .json({ message: 'Trip not found' });
        }

        res
            .status(200)
            .json(trip);

    } catch (err) {
        res
            .status(500)
            .json({ message: 'Error retrieving trip', error: err });
    }
};

// Export controller methods
module.exports = {
    tripsList,
    tripsReadOne
};
