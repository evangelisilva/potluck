const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const eventRoute = require('./routes/eventRoute');
const userRoute = require('./routes/userRoute');
const dishRoute = require('./routes/dishRoute');
const rsvpRoutes = require('./routes/rsvpRoute');
const dishSignup = require('./models/DishSignup');
const { sendEmail } = require('./services/emailService');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(bodyParser.json());

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
app.use('/api/rsvp', rsvpRoutes);

app.get('/', (req, res) => {
    res.send('Server is running'); 
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
