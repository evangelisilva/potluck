const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
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

const Event = require('./models/Event');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(bodyParser.json());

// Allow requests from all origins
app.use(cors());

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

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

// Routes
app.use('/api/events', eventRoute);
app.use('/api/users', userRoute);
app.use('/api/dishes', dishRoute);
app.use('/api/dishSignups', dishSignupRoute);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/eventRecap', eventRecapRoute);
app.use('/api/items', itemRoute);

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

// Api for filling the dish recommendation table
app.get('/dish-recommendation-test-fill', async (req, res) => {

  // reset everything in the table first
  const result = await dishRecommendationTest.deleteMany({});

  const csvtojson = require('csvtojson');


  const csvFilePath = 'dishData.csv';


  jsonDishData = await csvtojson().fromFile(csvFilePath)

  console.log("What does the json dish data look like?")
  console.log(jsonDishData)

  try {
    for (let i = 0; i < jsonDishData.length; i++){
      // Split the fields of: ingredients: [String], dietaryRestrictions: [String], allergens: [String], cuisines: [String],
      console.log("Filling out the data - what are the ingredients: ", jsonDishData[i].ingredients)
      jsonDishData[i].ingredients = jsonDishData[i].ingredients.split("-");
      jsonDishData[i].dietaryRestrictions = jsonDishData[i].dietaryRestrictions.split("|");
      // note: you may need to add back dashes in the dietary restrictions

      jsonDishData[i].allergens = jsonDishData[i].allergens.split("-");
      jsonDishData[i].cuisines = jsonDishData[i].cuisines.split("-");
      const dishRecord = new dishRecommendationTest(jsonDishData[i]);
      await dishRecord.save();
    }
  }
  catch(e){
    console.log("Error: ")
    console.log(e)
  }

  res.json({message : "Finished filling out the dish recommendations"})
})

app.get('/testApi', async (req, res) => {
  // Test find of the model to do something with it
  await Event.find({})
  res.json({Message : "done finding"})
})
