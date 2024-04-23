const mongoose = require('mongoose');

const dishCategoryQuantitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    taken: { type: Number, default: 0 } 
});

const locationSchema = new mongoose.Schema({
    streetAddress1: { type: String, required: true },
    streetAddress2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    // Add this field
    cuisines : {type : [String]},
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: locationSchema },
    contactNumber: {type: String},
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invitedGuests: [{ type: String }],
    status: { type: String, enum: ['Active', 'Cancelled'], default: 'Active' },
    visibility: { type: String, enum: ['Public', 'Private'], default: 'Public' },
    dishCategory: [dishCategoryQuantitySchema],
    coverImage: { type: String }, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
