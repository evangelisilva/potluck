const mongoose = require('mongoose');

const dishQuantitySchema = new mongoose.Schema({
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true }
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invitedGuests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    dishes: [dishQuantitySchema]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
