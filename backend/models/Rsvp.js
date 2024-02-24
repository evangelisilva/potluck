const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    event: { type: String, required: true},
    user: { type: String, required: true },
    response: { type: String, required: true},
    message: {type: String},
    // Note: anything that may be important for FUTURE LOGIC (i.e. is a clear identnfier, most things other tha "message")
    guests_count: { type: Number, required: true}
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;