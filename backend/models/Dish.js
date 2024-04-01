// Themes must be enum: 'appetizer', 'main course', 'and dessert'
/* Make sure you get an excess (a lot) of data */

const mongoose = require('mongoose');

// Define schema for the dataset
const dishSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [String],
    dietaryRestrictions: [String],
    allergens: [String],
    course: {
        type: String,
        enum: ['Appetizer', 'Main course', 'Dessert', 'Beverage', 'Salad']
    },
    cuisines: [String],
    preparationTime: Number,
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
const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;
