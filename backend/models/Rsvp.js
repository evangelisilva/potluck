const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true},
    note: {type: String},
    // Note: anything that may be important for FUTURE LOGIC (i.e. is a clear identnfier, most things other the "message")
    guestsBringing: { type: Number}
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;