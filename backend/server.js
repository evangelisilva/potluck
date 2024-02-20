const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const eventRoute = require('./routes/eventRoute');
const userRoute = require('./routes/userRoute');
const dishRoute = require('./routes/dishRoute');
const dishSignup = require('./models/DishSignup');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Allow requests from all origins
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/events', eventRoute);
app.use('/api/users', userRoute);
app.use('/api/dishes', dishRoute);
app.use('/api/dishSignups', dishSignup);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server once connected to MongoDB
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
