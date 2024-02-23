// Model data to integrate later with mongo db
/* Schema: {  

"_id": "rsvp_id",  

"event": "event_id", 

 "user": "user_id",  

"response": "yes", 

"guests_count": 2 

} */

let exampleEventRSVPData = [{  

    id: 1,  
    
    eventId: "65d3d557b90bec95e14f1476", 
    
    userId: 123,  
    
    response: "yes",
    
    userMessage: "Send something to the host...",
    
    guestsCount: 2 
    
}, ]



exports.viewRSVPStatus = async (req, res) => {
    try {

        
        const userId = req.params.userId;
        const eventId = req.params.eventId;

        let rsvpEntry = null;

        console.log("Test print - made it into the view RSVP status method");
        console.log("In here, the legnth of the RSVP data is: ", exampleEventRSVPData.length)

        // Check everything in the array for now
        for (let i = 0; i < exampleEventRSVPData.length; i++){
            ////console.log("The user Id is: ");
            ////console.log(exampleEventRSVPData[i].userId);
            ////console.log("Is the user id equal: ");
            ////console.log(exampleEventRSVPData[i].userId === userId)
            ////console.log("The event ID is: ")
            ////console.log(exampleEventRSVPData[i].eventId);
            ////console.log("Is the event id equal: ");
            ////console.log(exampleEventRSVPData[i].eventId === eventId);
            if (exampleEventRSVPData[i].userId === parseInt(userId) && exampleEventRSVPData[i].eventId === eventId){
                rsvpEntry = exampleEventRSVPData[i];
            }
        }

        // RSVP response

        if (rsvpEntry === null){
           res.json(null); 
        }
        else{
            res.json({rsvpId: rsvpEntry.id, response : rsvpEntry.response, userMessage : rsvpEntry.userMessage ,message : "RSVP viewed successfully."});
        }

    } catch (error) {
        console.error('Error viewing rsvp status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

exports.createRSVP = async (req, res) =>{
    try {
      // add to the example rsvp data (since in the case of this function beling called, a matching record has not been found)
    
      console.log("Inside the rsvp create");
      
      exampleEventRSVPData.push({id: req.body.id,  
    
        // needs to be specifided in the params (the rest needs to be in the body)
        eventId: req.params.eventId, 
        
        userId: req.body.userId,  
        
        response: req.body.response,
        
        userMessage: req.body.userMessage,
        
        guestsCount: req.body.guestsCount})

        res.header("Access-Control-Allow-Origin", "*");

        res.json({rsvpId : req.body.id, eventId : req.params.eventId, message : "RSVP recorded successfully to this event."});

      } catch (error) {
        
        console.error('Error creating an rsvp entry:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// TODO - add actual code in here
exports.updateRSVP = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({test : "test"})
    }

    catch {
        console.error('Error updating an rsvp record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// TODO (alternative) - implement chat gpt's idea for this code
/* 

const Rsvp = require('../models/rsvp');

// View status of RSVP for given user and event
async function viewRSVPStatus(req, res) {
    const { userId, eventId } = req.params;
    try {
        const rsvp = await Rsvp.findOne({ user: userId, event: eventId });
        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found' });
        }
        res.json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create an RSVP record
async function createRSVP(req, res) {
    const { eventId } = req.params;
    const { user, response, guests_count } = req.body;
    try {
        const rsvp = new Rsvp({ event: eventId, user, response, guests_count });
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update an already-existing RSVP record
async function updateRSVP(req, res) {
    const { rsvpId } = req.params;
    const { response, guests_count } = req.body;
    try {
        const rsvp = await Rsvp.findByIdAndUpdate(rsvpId, { response, guests_count }, { new: true });
        if (!rsvp) {
            return res.status(404).json({ message: 'RSVP not found' });
        }
        res.json(rsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    viewRSVPStatus,
    createRSVP,
    updateRSVP
};

*/