const mongoose = require('mongoose');

const dishCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const DishCategory = mongoose.model('DishCategory', dishCategorySchema);

module.exports = DishCategory;
