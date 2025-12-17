const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

/**
 * Register new user
 */
const register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields required'
    });
  }

  try {
    const user = new User();
    user.email = req.body.email;

    // name is optional
    if (req.body.name) {
      user.name = req.body.name;
    }

    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJwt();
    res.status(200).json({ token });

  } catch (err) {
    // Duplicate email
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }
    res.status(400).json(err);
  }
};

/**
 * Login existing user
 */
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields required'
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};
