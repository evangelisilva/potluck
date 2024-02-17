import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';

function NewEventPage4() {
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

    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col md={7} style={{ paddingTop: '50px', paddingLeft: '70px', color: '#4D515A', fontFamily: 'Inter' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Aleo', fontSize: '45px' }}>Add Invitees</h2> 
                    
                    <Form.Group>
                        {/* Description text */}
                        <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                            If you're not ready to add invitees just yet, feel free to skip this step. Click 'Next' to proceed with <br/> your event setup. <br />
                            Note: To add email addresses, enter each email address in the text area and press Enter.
                        </Form.Text> <br />
                        
                        {/* Email input row */}
                        <Row style={{paddingTop: '25px', maxWidth: '600px'}}>
                            <Col style={{ width: '120px' }}>
                                <Form.Label>Email address</Form.Label>
                            </Col>
                            <Col style={{ maxWidth: '420px'}}>
                                <input
                                    type="text"
                                    value={emailInput}
                                    onChange={handleEmailChange}
                                    onKeyDown={handleKeyDown}
                                    style={{ width: '420px', minHeight: '30px', border: '1px solid #ced4da', borderRadius: '.25rem', padding: '5px'}}
                                />
                            </Col>
                        </Row>
                        {/* Display entered email addresses */}
                        <Row style={{maxWidth: '600px'}}>
                            <Col style={{ width: '120px' }}>
                            </Col>
                            <Col style={{ maxWidth: '420px'}}>
                                <div style={{fontSize: '13px', color: '#4D515A', width: '420px'}}>
                                    {emailsList.map((email, index) => (
                                        <span key={index} style={{ paddingTop: '3px', paddingBottom: '3px', paddingLeft: '10px',border: '1px solid #ccc', borderRadius: '30px' }}>
                                            {email}
                                            {/* Button to remove email address */}
                                            <Button onClick={() => handleRemoveEmail(email)} style={{ paddingTop: '1px', paddingLeft: '3px', backgroundColor: 'transparent', borderColor: 'transparent', color:'#4D515A'}}> 
                                                <Image
                                                    src={process.env.PUBLIC_URL + '/remove.png'}
                                                    style={{ maxHeight: '15px' }}
                                                />
                                            </Button>
                                        </span> 
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                {/* Right column */}
                <Col md={5}>
                    <Image src={process.env.PUBLIC_URL + '/img_4.jpg'} style={{ paddingTop: '60px', paddingRight: '80px' }} fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default NewEventPage4;
