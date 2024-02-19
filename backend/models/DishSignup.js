const mongoose = require('mongoose');

const dishSignupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true }, 
});

const DishSignup = mongoose.model('DishSignup', dishSignupSchema);

module.exports = DishSignup;
