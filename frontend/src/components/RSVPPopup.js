import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/modal.css';

const RSVPPopup = ({ onClose, eventID }) => {
    const [attendance, setAttendance] = useState('');
    const [userMessage, setUserMessage] = useState('');

    const handleRSVP = () => {
        console.log("RSVP:", attendance);
        console.log("Message:", userMessage);
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