const mongoose = require('mongoose');

const itemSignupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

const DishSignup = mongoose.model('ItemSignup', itemSignupSchema);

module.exports = ItemSignup;
