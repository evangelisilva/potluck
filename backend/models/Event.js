const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    dietaryRestrictions: { type: String },
    allergens: { type: String },
    userId: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]}
});

const dishQuantitySchema = new mongoose.Schema({
    name: { type: String },
    quantityTaken: { type: Number },
    quantityNeeded: { type: Number },
    notes: { type: String },
    signups: { type: [signUpSchema]}
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
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    dishes: [dishQuantitySchema],
    coverImage: { type: String } 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
