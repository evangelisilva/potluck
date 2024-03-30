const mongoose = require('mongoose');

const dishSignupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    // Reference an event, to mark the dishes signed up for for a given event (maybe make it required later)
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    quantity: { type: Number, required: true }, 
});

const DishSignup = mongoose.model('DishSignup', dishSignupSchema);

module.exports = DishSignup;
