// Model data to integrate later with mongo db
/* Schema: const rsvpSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true},
    event: { type: String, required: true},
    user: { type: String, required: true },
    response: { type: String},
    message: { type: String},
    // Note: anything that may be important for FUTURE LOGIC (i.e. is a clear identnfier, most things other tha "message")
    guests_count: { type: Number, required: true}
});
 */


const Rsvp = require('../models/Rsvp');
const DishSignup = require('../models/DishSignup');


// Creating a global record with example data

let exampleEventRSVPData = {  
    
    event: '65d39315f2a7f4725441f1a9', 
    
    user: '65d37b14f608ce904718e311',
    
    status: "yes",
    
    note: "Something sent to the host...",
    
    guestsBringing: 2 
    
};




let rsvpFixed = new Rsvp(exampleEventRSVPData);

// Before saving a record - try to delete the original
// {event: '65d39315f2a7f4725441f1a9', user: '65d37b14f608ce904718e311'}
Rsvp.deleteMany({}).then(
    () => console.log("RSVP controller - Deleted some records from mongo db")
  ).then(
    () => rsvpFixed.save()
  ).then(
    () => console.log("rsvp controller - Added an RSVP record into mongo db")
);

/* Test of adding into the dish signup schema (ids should be similar to those of the RSVP schema)
const dishSignupSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true }, 
});

*/

/*
const exampleDishSignupData = {
    user: '65d37b14f608ce904718e311',
    dish: '65d37dd5bf4bccaffc1f0a75',
    quantity: 3
}

const dishSignupFixed = new DishSignup(exampleDishSignupData);

// Before saving a record - try to delete the original
DishSignup.deleteMany({user: '65d37b14f608ce904718e311', dish: '65d37dd5bf4bccaffc1f0a75'}).then(
    () => console.log("RSVP controller - Deleted some records from mongo db")
  ).then(
    () => dishSignupFixed.save()
  ).then(
    () => console.log("rsvp controller - Added a DISH SIGNUP record into mongo db")
);
*/


// TODO (alternative) - implement chat gpt's idea for this code



// View status of RSVP for given user and event
exports.viewRSVPStatus = async(req, res) => {
    const { userId, eventId } = req.params;
    try {
        const rsvp = await Rsvp.findOne({ user: userId, event: eventId });
        if (!rsvp) {
            return res.status(201).json({ message: 'RSVP not found' });
        }
        // Note: this should have the ID auto-generated by the database in here to return (which will subsequently be used for an update)
        res.json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create an RSVP record
exports.createRSVP = async(req, res) => {
    const { eventId } = req.params;
    const { user, status, note, guestsBringing} = req.body;
    try {
        const rsvp = new Rsvp({ event: eventId, user, status, note, guestsBringing});
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update an already-existing RSVP record
exports.updateRSVP = async(req, res) => {
    const { rsvpId } = req.params;
    const { status, note, guestsBringing } = req.body;
    try {
        const rsvp = await Rsvp.findByIdAndUpdate(rsvpId, { status, note, guestsBringing}, { new: true });
        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found' });
        }
        res.json(rsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}