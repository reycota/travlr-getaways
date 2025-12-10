// app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips  → all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips', error: err });
  }
};

// GET /api/trips/:tripId  → one trip
const tripsReadOne = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!tripId) {
      return res.status(400).json({ message: 'tripId parameter is required' });
    }

    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err });
  }
};

// POST /api/trips  → create a new trip
const tripsCreate = async (req, res) => {
  try {
    const {
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    } = req.body;

    const trip = new Trip({
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    });

    const saved = await trip.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating trip', error: err });
  }
};

// PUT /api/trips/:tripId  → update an existing trip
const tripsUpdateOne = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!tripId) {
      return res.status(400).json({ message: 'tripId parameter is required' });
    }

    const trip = await Trip.findById(tripId).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const {
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    } = req.body;

    trip.code = code;
    trip.name = name;
    trip.length = length;
    trip.start = start;
    trip.resort = resort;
    trip.perPerson = perPerson;
    trip.image = image;
    trip.description = description;

    const updated = await trip.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err });
  }
};

// DELETE /api/trips/:tripId  → optional (nice to have)
const tripsDeleteOne = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!tripId) {
      return res.status(400).json({ message: 'tripId parameter is required' });
    }

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
