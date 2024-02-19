const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoute');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/events', eventRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server once connected to MongoDB
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
