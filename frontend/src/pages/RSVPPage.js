import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './RSVPPage.css'

const RSVPPage = () => {
  
  
  const { eventId } = useParams(); // Extract the eventId from the URL
  // This is not a state variable (as it needs to be permanently set)
  let userId = 123;
  const [userRole, setUserRole] = useState('guest'); // Default user role is guest

  const [yesClicked, setYesClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

 
  const[userResponse, setUserResponse] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(0);




  useEffect(() => {
    // Fetch event details or perform any necessary actions based on the eventId
    // For example, you may want to fetch event details from the server

    // Set user's role based on the event ID (if needed)
    // This is just an example, you may have different logic to determine user's role
    setUserRole('guest');
  }, [eventId]);

  const handleRSVP = (e) => {
    e.preventDefault();
    // Handle RSVP submission here
    // You can send a request to the server to update the RSVP status

    // Data needed for the post request
    /// user ID, response, message, number of guests
    /// note: it doesn't need to be a state variable (?) - and instead should be CONSTANT within a call to the handler
    /// note: event ID may also be needed (as a common identifier for everything)

    
    
    
    
    // Test print to see whether this data is properly stored
    console.log("Test print, in the handle rsvp function");

    console.log("Currrent RSVP data stored", data);

    const data2 = {name : "Jacob", email : "jkoplik@albany.edu"};

    axios.post('http://localhost:8000/api/rsvp-request', data)
      .then(response => {
        // Handle success, if needed
        console.log(response);
      })
      .catch(error => {
        // Handle error, if needed
        console.error(error);
      });

  };

  
  
  const handleYesClick = () => {
    // set the yes button to blue
    setYesClicked(true);
    // set the other buttons background colors back to white
    setUserResponse('yes');
    console.log("Test print, in the handle yes click function");
    ////const data = {user : userId, event: eventId, response : userResponse, message : userMessage, guests : numberOfGuests};
    ////console.log("Currrent RSVP data stored - since it can't be printed in the submit function", data);
  };

  const handleNoClick = () => {

  };

  const handleMaybeClick = () => {

  };


  const handleMouseEnterYes = () => {
    setIsHovered(true);
  }

  const handleMouseLeaveYes = () => {
    setIsHovered(false);
  }

  const yesButtonStyle = {
    backgroundColor: (isHovered || yesClicked) ? 'gray' : 'white',
    transition: 'background-color 0.3s ease',
  };


  const handleChange = (event) => {
    setUserMessage(event.target.value);
  };



  /* Initial plan for UI -
    Header: One row for the banner (maybe ask about standardizing it across all pages in the meeting)
    One column for everything besides the image (containing a sub-row for the yes, no, maybe buttons)
    One column for the "rsvpPageImage"
    Footer: this page is a standalone, and not in a sequence, so is anything really needed? 

  */

  /* Previous stuff returned */
  /* <div>
      <h1>RSVP Page</h1>
      <p>Event ID: {eventId}</p>
      <p>User Role: {userRole}</p>
      <button onClick={handleRSVP}>RSVP</button>
    </div> */

  return (
    <>
       {/* TODO - maybe put this row in its own container */}
       
       <Row>
            {/*     Header: One row for the banner (maybe ask about standardizing it across all pages in the meeting) */}
       </Row>
      
       <br></br>
       <br></br>

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="container">
              <h1>RSVP to event [Event] hosted by Host [Host]</h1>
              <br></br>
              {/* The buttons should get a gray highlight when you hover over them */}

              <Row>
            
                {/* Yes Button */}
                <Col>
                  <button className="yesButton" 
                  style={yesButtonStyle}
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes} onClick = {handleYesClick}><strong>Yes</strong></button>
                </Col>

                {/* No Button */}
                <Col>
                  <button className="noButton" onClick = {handleNoClick}><strong>No</strong></button>
                </Col>

                {/* Maybe Button */}
                <Col>
                  <button className="maybeButton" onClick = {handleMaybeClick}><strong>Maybe</strong></button>
                </Col>
              </Row>
              <br></br>
              <p>Send a message to the host (optional) </p>
              
              <textarea className = "messageTohost"
                value={userMessage}
                onChange={handleChange}
                placeholder="Type something..."
                rows={4} // You can adjust the number of rows as needed
                cols={50} // You can adjust the number of columns as needed
              />

              <form onSubmit={handleRSVP}>
                <button className="rsvpSubmitButton" type="submit">Submit</button>
              </form>


            </div>
          </div>
          <div class="col-md-6">
            <div class="container">
              <img className="img_3" src={process.env.PUBLIC_URL + '/img_3.jpg'} alt="img_3"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RSVPPage;
