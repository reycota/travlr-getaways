const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// GET /api/trips  → all trips
router
  .route('/trips')
  .get(ctrlTrips.tripsList);

// GET /api/trips/:tripId → one trip
router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsReadOne);

module.exports = router;
