import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import '../styles/modal.css';
import SendInviteButton from './SendInviteButton';

const InviteePopup = ({ onClose }) => {
    // State to manage the input for email addresses
    const [emailInput, setEmailInput] = useState('');
    // State to store the list of entered email addresses
    const [emailsList, setEmailsList] = useState([]);

    // Function to handle changes in the email input field
    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    // Function to handle key presses in the email input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const email = emailInput.trim();
            if (email !== '') {
                // Add the entered email to the list
                setEmailsList([...emailsList, email]);
                // Clear the input field
                setEmailInput('');
            }
        }
    };

    // Function to remove an email address from the list
    const handleRemoveEmail = (emailToRemove) => {
        setEmailsList(emailsList.filter((email) => email !== emailToRemove));
    };

    // Function to get the current list of entered emails
    const getEmailArray = () => {
        return emailsList;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '100%', margin: '50px', color: '#4D515A' }}>
                            <h2 style={{ fontFamily: 'Aleo', fontSize: '45px' }}>Add Invitees</h2>
                            <Form.Group>
                                <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                    To add invitees, enter the email address of each invitee in the text area and press Enter.
                                </Form.Text>
                                <br />
                                {/* <Form.Label>Email address</Form.Label> <br /> */}
                                <input
                                    type="text"
                                    value={emailInput}
                                    onChange={handleEmailChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder='Email address'
                                    style={{
                                        width: '525px',
                                        minHeight: '30px',
                                        border: '1px solid #ced4da',
                                        borderRadius: '.25rem',
                                        padding: '5px',
                                        marginTop: '10px',
                                    }}
                                />
                                <Row>
                                    <Col style={{ width: '500px', height: '550px', overflowY: 'auto' }}>
                                        <div style={{ fontSize: '13px', color: '#4D515A', width: '420px' }}>
                                            {emailsList.map((email, index) => (
                                                <span key={index} style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '10px', border: '1px solid #ccc', borderRadius: '30px' }}>
                                                    {email}
                                                    <Button onClick={() => handleRemoveEmail(email)} style={{ paddingTop: '1px', paddingLeft: '3px', backgroundColor: 'transparent', borderColor: 'transparent', color: '#4D515A' }}>
                                                        <Image src={process.env.PUBLIC_URL + '/remove.png'} style={{ maxHeight: '15px' }} />
                                                    </Button><br />
                                                </span>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Container>
                    </div>
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
                                fontFamily: 'Inter',
                                marginRight: '10px',
                                color: ' #4D515A'
                            }}>
                            Cancel
                        </Button>
                        <SendInviteButton
                            invitee="Evangeli"
                            host="Evangeli Silva"
                            date="2021-06-10"
                            time="10:00 AM"
                            address="1234 Main Street, Anytown, USA"
                            theme="International Cuisine"
                            rsvpDeadline="June 15, 2021"
                            eventId="1234567890"
                            to={getEmailArray()}
                            variant="primary"
                            style={{ marginRight: '60px' }}>
                            Send Invites
                        </SendInviteButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InviteePopup;
