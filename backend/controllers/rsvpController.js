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
        
        console.error('Error creating an rsvp:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
