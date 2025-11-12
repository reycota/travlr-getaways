const express = require('express');
const router = express.Router();
const travelerController = require('../controllers/travelerController');

//Route : GET /travel
router.get('/', travelerController.listTrips);

module.exports = router; 