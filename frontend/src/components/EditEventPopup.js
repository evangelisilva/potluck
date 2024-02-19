import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import '../styles/modal.css';

// EditEventPopup component takes onClose function as props
const EditEventPopup = ({ onClose }) => {
    // State variables for form fields
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // You can implement your logic here to handle form submission
        // For example, you can send a request to update the event details
        // and then close the popup.
        onClose();
    };

    return (
        // Modal overlay
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{height: '94%'}}>
                <div className="modal-content">
                    <div className="modal-body">
                        {/* Container for the content */}
                        <Container style={{ width: '525px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            {/* Title */}
                            <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Edit Event</h2>
                            {/* Divider */}
                            <hr style={{ borderTop: '1px solid #ccc'}} />
                            {/* Form */}
                            <Form onSubmit={handleSubmit}>
                                {/* Event Name */}
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </Form.Group> <br/>
                                {/* Description */}
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group> <br/>
                                {/* Cover Image Upload */}
                                <Form.Group>
                                    <Form.Label>Cover Image</Form.Label>
                                    <Form.Control type="file" custom accept="image/*" style={{ width: '100%' }} />
                                    {/* Cover Image Upload Note */}
                                    <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                        For best results please use a landscape photo.
                                    </Form.Text>
                                </Form.Group><br/>
                                {/* Event Date, Start Time, End Time */}
                                <Form.Group>
                                    <Row style={{ maxWidth: '525px' }}>
                                        {/* Event Date */}
                                        <Col style={{ paddingRight: '12px' }}>
                                            <Form.Label>Date</Form.Label> 
                                            <Form.Control type="date"style={{ width: 'auto' }}/>
                                        </Col>
                                        {/* Event Start Time */}
                                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <Form.Label>Start Time</Form.Label> <Form.Control type="time" style={{ width: '154px' }}/>
                                        </Col>
                                        {/* Event End Time */}
                                        <Col>
                                            <Form.Label>End Time</Form.Label> 
                                            <Form.Control type="time" style={{ width: '154px' }}/>
                                        </Col>
                                    </Row>
                                </Form.Group> <br/> 
                                {/* Street Address */}
                                <Form.Group>
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control type="text" style={{ marginBottom: '8px' }}/> 
                                    <Form.Control type="text"/>
                                </Form.Group> <br/> 
                                {/* City, State, Zip code */}
                                <Form.Group>
                                    <Row style={{ maxWidth: '525px' }}>
                                        {/* City */}
                                        <Col style={{ paddingRight: '12px' }}>
                                            <Form.Label>City</Form.Label> 
                                            <Form.Control type="text" style={{ width: '150px' }} />
                                        </Col>
                                        {/* State */}
                                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <Form.Label>State</Form.Label> 
                                            <Form.Control type="text" style={{ width: '125px' }} />
                                        </Col>
                                        {/* Zip code */}
                                        <Col>
                                            <Form.Label>Zip code</Form.Label> 
                                            <Form.Control  type="text" style={{ width: 'auto' }} />
                                        </Col>
                                    </Row>
                                </Form.Group>   
                            </Form>
                        </Container>
                    </div>
                    {/* Modal footer */}
                    <div className="modal-footer">
                        {/* Cancel button */}
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
                        {/* Save Changes button */}
                        <Button
                            variant="primary"
                            onClick={onClose}
                            type="submit"
                            style={{
                                backgroundColor: '#E8843C', 
                                borderColor: '#E8843C', 
                                borderRadius: '30px', 
                                fontFamily: 'Arial', 
                                paddingLeft: '15px', 
                                paddingRight: '15px', 
                                marginRight: '60px' 
                            }}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditEventPopup;
