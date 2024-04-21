const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    category: { type: String, required: true },
    event:  { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    slot_count: { type: Number, required: true },
    quantity: { type: Number, required: true },
    signups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
