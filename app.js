// app.js
require('dotenv').config();
require('./app_api/models/db');
require('./app_api/models/user');
require('./app_api/config/passport');

const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./app_api/routes/index');
const travelerRoutes = require('./app_server/routes/travelerRoutes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');

//initializing passport
app.use(passport.initialize());

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Angular SPA (port 4200)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// View engine (Handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/main' });

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRouter);

// Server-rendered travel page (from earlier modules)
app.use('/travel', travelerRoutes);

// Simple home routes
app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/', (req, res) => {
  res.redirect('/home');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
