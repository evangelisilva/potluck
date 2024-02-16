import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RSVPPage = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const [userRole, setUserRole] = useState('guest'); // Default user role is guest

  useEffect(() => {
    // Fetch event details or perform any necessary actions based on the eventId
    // For example, you may want to fetch event details from the server

    // Set user's role based on the event ID (if needed)
    // This is just an example, you may have different logic to determine user's role
    setUserRole('guest');
  }, [eventId]);

  const handleRSVP = () => {
    // Handle RSVP submission here
    // You can send a request to the server to update the RSVP status
  };

  const handleYesClick = () => {

  };

  const handleNoClick = () => {

  };

  const handleMaybeClick = () => {

  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnterYes = () => {
    setIsHovered(true);
  }

  const handleMouseLeaveYes = () => {
    setIsHovered(false);
  }

  const yesButtonStyle = {
    backgroundColor: isHovered ? 'gray' : 'white',
    color: 'black',
    padding: '10px 20px',
    border: 'solid',
    borderColor: 'black',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="container">
              <h1>RSVP to event [Event] hosted by Host [Host]</h1>

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
