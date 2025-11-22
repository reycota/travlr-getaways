const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('./app_api/models/db');
const apiRouter = require('./app_api/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));

//Set the view engine to Handlebars and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/main' });

// Serve static HTML files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const travelerRoutes = require('./app_server/routes/travelerRoutes');
app.use('/travel', travelerRoutes);

// Routes starting with /api go to new API directory
app.use('/api', apiRouter);

// Simple test route to verify server response
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Express is serving Travlr static pages correctly!' });
});

//Routing Express to render views/about.hbs using the main.hbs layout and inject "About" into the {{title}} placeholder.
app.get('/about', (req, res) => {
  res.render('about', {title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.get('/rooms', (req, res) => {
  res.render('rooms', { title: 'Rooms' });
});

app.get('/meals', (req, res) => {
  res.render('meals', { title: 'Meals' });
});

app.get('/news', (req, res) => {
  res.render('news', { title: 'News' });
});

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
