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
    user.name = req.body.name;
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJWT();
    res.status(200).json({ token });
  } catch (err) {
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
      return res.status(500).json(err);
    }
    if (user) {
      const token = user.generateJWT();
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
