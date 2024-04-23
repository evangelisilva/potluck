const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const dotenv = require('dotenv');
const Item = require('../models/Item'); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dishController = require('../controllers/dishController');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY); 

// Create a new dish
router.post('/', dishController.createDish);

// Get dish details by dish ID
router.get('/:dishId', dishController.getDishById);

// Get all dishes
router.get('/', dishController.getAllDishes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType
      },
    };
}
  
const upload = multer({ storage: storage }).single('image');

router.post('/recognize-dish', upload, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const imagePath = req.file.path;
  
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
      const prompt = "what is this dish out of Roasted Garlic Mashed Potatoes, Chicken Stir-Fry, Quinoa Salad, Vegetable Lasagna, Fruit Platter? Show the reciepe and ingredients. Also allergens. nutrients and calories. Show in html format (only the body)";
      const imagePart = fileToGenerativePart(imagePath, "image/jpeg");
  
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
  
      fs.unlinkSync(imagePath);
  
      res.json({ text });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/recognize-dish/:eventId', upload, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { eventId } = req.params;

      const items = await Item.find({ event: eventId })
      const itemNames = items.map(item => item.name).join(', ');

      const imagePath = req.file.path;
  
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
      const prompt = "what is this dish out of " + itemNames + "? Show the reciepe and ingredients. Also allergens. nutrients and calories. Show in html format (only the body)";
      console.log(prompt);
      const imagePart = fileToGenerativePart(imagePath, "image/jpeg");
  
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
  
      fs.unlinkSync(imagePath);
  
      res.json({ text });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
