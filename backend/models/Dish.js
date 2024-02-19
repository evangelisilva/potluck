const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
