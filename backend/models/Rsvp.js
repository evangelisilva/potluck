const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    event: { type: String, required: true},
    user: { type: String, required: true },
    response: { type: String},
    // Note: anything that may be important for FUTURE LOGIC (i.e. is a clear identnfier, most things other tha "message")
    guests_count: { type: Number, required: true}
});

const Rsvp = mongoose.model('Dish', rsvpSchema);

module.exports = Rsvp;