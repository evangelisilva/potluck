// Themes must be enum: 'appetizer', 'main course', 'and dessert'
/* Make sure you get an excess (a lot) of data */

const mongoose = require('mongoose');

// Define schema for the dataset
const dishSchema = new mongoose.Schema({
    dishName: String,
    description: String,
    ingredients: [String],
    dietaryRestrictions: [String],
    allergens: [String],
    course: {
        type: String,
        enum: ['Appetizer', 'Main course', 'Dessert']
    },
    cuisines: [String],
    preparationTime: String,
    complexity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    popularity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
});

// Create and export the model
const dishRecommendationTest = mongoose.model('dishRecommendationTest', dishSchema);
module.exports = dishRecommendationTest;
