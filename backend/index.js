const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const Event = require('./models/Event');
const eventRoute = require('./routes/eventRoute');
const eventRecapRoute = require('./routes/eventRecapRoute')
const userRoute = require('./routes/userRoute');
const dishRoute = require('./routes/dishRoute');
const rsvpRoutes = require('./routes/rsvpRoute');
const itemRoute = require('./routes/itemRoute');
const dishSignupRoute = require('./routes/dishSignupRoute');
const { sendEmail } = require('./services/emailService');
const userService = require('./services/userService');
const dishRecommendationTest = require('./models/Dish');

// Create Express app
const app = express();

// Load environment variables from .env file
dotenv.config();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/events', eventRoute);
app.use('/api/users', userRoute);
app.use('/api/dishes', dishRoute);
app.use('/api/dishSignups', dishSignupRoute);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/eventRecap', eventRecapRoute);
app.use('/api/items', itemRoute);

app.get('/api/auth', (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const userId = userService.extractUserIdFromToken(token);
    res.json({userId});
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for processing an RSVP request from a user (temporary: needs to be moved to other folder)
app.post('/api/rsvp-request', (req, res) => {
  // Handle the POST request here
  console.log("here is the body of the request recevied: " + req.body.user + ", " + req.body.event); // This will contain the data sent from the frontend
  
  //// const {user, event, response,  message, guests} = req.body;
  //// console.log("Here is the user received in the post request: " + user);
  
  // Process the data and send a response if needed
  res.send('POST request received');
});

//All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/// Connect to MongoDB
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