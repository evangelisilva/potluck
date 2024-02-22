import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/modal.css';
import axios from 'axios';


const RSVPPopup = ({ onClose, eventId, userId }) => {
    const [attendance, setAttendance] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/rsvp/view-status/${userId}/${eventId}`)
          .then(data => {
            ////console.log("In rsvp popup - axios.get - what is the RSVP status?");
            setRsvpStatus(data);
            ////console.log(rsvpStatus);
            ////console.log("What is the data");
            ////console.log(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, [])

    const handleRSVP = async () => {
        ////console.log("RSVP:", attendance);
        ////console.log("Message:", userMessage);

        // First, do a get request to view rsvp status
        // Make GET request to Node.js server
        

        // Issues
        /// Q: should this get be based on "useEffect" or should it be right in here
        /// A: try not doing so to make the data "recieved easier"
        /// Q: how do we access the data before the reutnr statment
        /// A: We'll have to find out in here
        // Second, do a conditional (RSVP, or update RSVP) depeding on the response payload
        
        ////console.log("In rsvp popup - what is the data outside of axios get?");
        ////console.log(rsvpStatus.data);

        console.log("RSVP status response", rsvpStatus.data);
        // Create rsvp case
        if (rsvpStatus.data === null){
            
            // Server url: api/rsvp/create/:eventId

            const createData = {id: 2,                  
                userId: 124,  
                
                response: "yes",
                
                userMessage: "Here is the newly created rsvp entry",
                
                guestsCount: 2 };
            
            axios.post(`http://localhost:8000/api/rsvp/create/${eventId}`, createData)
            .then(response => {
              // Handle success, if needed
              console.log("Create RSVP response: ");
              console.log(response.data);
            })
            .catch(error => {
              // Handle error, if needed
              console.error(error);
            });
        }
        // Update RSVP case
        else{
            console.log("RSVP update response: <not yet implemented>");
        }

        onClose();
    };

    const handleChange = (event) => {
        setUserMessage(event.target.value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ height: '48%' }}>
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '500px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>RSVP</h2>
                            <hr style={{ borderTop: '1px solid #ccc' }} />
                            <Form>
                                <Form.Label>Excited to see you! Will you attend?</Form.Label>
                                <Form.Group controlId="attendanceRadio">
                                    <Form.Check
                                        type="radio"
                                        label="Yes, I'll be there"
                                        name="attendance"
                                        value="attending"
                                        checked={attendance === 'attending'}
                                        onChange={() => setAttendance('attending')}
                                        style={{ marginRight: '30px' }}
                                        inline
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="No, I can't make it"
                                        name="attendance"
                                        value="not_attending"
                                        checked={attendance === 'not_attending'}
                                        onChange={() => setAttendance('not_attending')}
                                        style={{ marginRight: '30px' }}
                                        inline
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Maybe"
                                        name="attendance"
                                        value="may_be"
                                        checked={attendance === 'may_be'}
                                        onChange={() => setAttendance('may_be')}
                                        inline
                                    />
                                </Form.Group><br />
                                
                                <Form.Group controlId="messageToHost">
                                    <Form.Label>Leave a message for the host (optional)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={userMessage}
                                        onChange={handleChange}
                                        rows={4}
                                        cols={50}
                                    />
                                </Form.Group><br />
                                
                                <div className="modal-footer">
                                    <Button
                                        variant="primary"
                                        onClick={onClose}
                                        style={{
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            borderRadius: '30px',
                                            backgroundColor: 'transparent',
                                            border: 'None',
                                            fontFamily: 'Arial',
                                            marginRight: '10px',
                                            color: ' #4D515A'
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleRSVP}
                                        style={{
                                            backgroundColor: '#E8843C',
                                            borderColor: '#E8843C',
                                            borderRadius: '30px',
                                            fontFamily: 'Arial',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                        }}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSVPPopup;
