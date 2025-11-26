const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/travlr';

mongoose.connect(dbURI)
  .then(() => {
    console.log(`Mongoose connected to ${dbURI}`);
  })
  .catch(err => {
    console.error('Mongoose connection error:', err);
  });

// Require the model to register it
require('./travlr');
