const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips → all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips', error: err });
  }
};

// GET /api/trips/:tripId → one trip (BY _id)
const tripsReadOne = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err });
  }
};

// POST /api/trips → create
const tripsCreate = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const saved = await trip.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating trip', error: err });
  }
};

// PUT /api/trips/:tripId → update (BY _id)
const tripsUpdateOne = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    Object.assign(trip, req.body);
    const updated = await trip.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err });
  }
};

// DELETE /api/trips/:tripId → delete (BY _id)
const tripsDeleteOne = async (req, res) => {
  try {
    const { tripId } = req.params;
    await Trip.findByIdAndDelete(tripId).exec();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Error deleting trip', error: err });
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsCreate,
  tripsUpdateOne,
  tripsDeleteOne
};
