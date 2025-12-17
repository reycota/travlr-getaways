const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

console.log('🔥 API ROUTES LOADED 🔥');


const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/auth');

/**
 * JWT authentication middleware
 */
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

/**
 * Authentication routes
 */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/**
 * Trip routes
 * GET is public
 * POST / PUT / DELETE require JWT
 */
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(authenticateJWT, ctrlTrips.tripsCreate);

router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsReadOne)
  .put(authenticateJWT, ctrlTrips.tripsUpdateOne)
  .delete(authenticateJWT, ctrlTrips.tripsDeleteOne);

module.exports = router;
