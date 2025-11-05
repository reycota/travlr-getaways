const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));

// Serve static HTML files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple test route to verify server response
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Express is serving Travlr static pages correctly!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
