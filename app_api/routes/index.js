// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// /api/trips
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(ctrlTrips.tripsCreate);

// /api/trips/:tripId
router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsReadOne)
  .put(ctrlTrips.tripsUpdateOne)
  .delete(ctrlTrips.tripsDeleteOne);

module.exports = router;
