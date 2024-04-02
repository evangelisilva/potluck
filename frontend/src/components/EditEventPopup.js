import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/modal.css';

// EditEventPopup component takes onClose function as props
const EditEventPopup = ({ onClose, onSave }) => {
    // State variables for form fields
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [streetAdress1, setStreetAdress1] = useState('');
    const [streetAdress2, setStreetAdress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            title,
            description,
            date,
            startTime,
            endTime,
            streetAdress1,
            streetAdress2,
            city,
            state,
            zipCode
        };
        // Prompt the user to confirm before saving
        const isConfirmed = window.confirm("Are you sure you want to save changes?");
        if (isConfirmed) {
            onSave(formData, true); // Pass confirmed status as true
            onClose();
        }
    };

    return (
        // Modal overlay
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                            <Form.Control type="date" onChange={(e) => setDate(e.target.value)} style={{ width: 'auto' }}/>
                                        </Col>
                                        {/* Event Start Time */}
                                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <Form.Label>Start Time</Form.Label> <Form.Control type="time" onChange={(e) => setStartTime(e.target.value)} style={{ width: '154px' }}/>
                                        </Col>
                                        {/* Event End Time */}
                                        <Col>
                                            <Form.Label>End Time</Form.Label> 
                                            <Form.Control type="time" onChange={(e) => setEndTime(e.target.value)} style={{ width: '154px' }}/>
                                        </Col>
                                    </Row>
                                </Form.Group> <br/> 
                                {/* Street Address */}
                                <Form.Group>
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setStreetAdress1(e.target.value)} style={{ marginBottom: '8px' }}/> 
                                    <Form.Control type="text" onChange={(e) => setStreetAdress2(e.target.value)}/>
                                </Form.Group> <br/> 
                                {/* City, State, Zip code */}
                                <Form.Group>
                                    <Row style={{ maxWidth: '525px' }}>
                                        {/* City */}
                                        <Col style={{ paddingRight: '12px' }}>
                                            <Form.Label>City</Form.Label> 
                                            <Form.Control type="text" onChange={(e) => setCity(e.target.value)} style={{ width: '150px' }} />
                                        </Col>
                                        {/* State */}
                                        <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                            <Form.Label>State</Form.Label> 
                                            <Form.Control type="text" onChange={(e) => setState(e.target.value)} style={{ width: '125px' }} />
                                        </Col>
                                        {/* Zip code */}
                                        <Col>
                                            <Form.Label>Zip code</Form.Label> 
                                            <Form.Control  type="text" onChange={(e) => setZipCode(e.target.value)} style={{ width: 'auto' }} />
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
                                color: ' #4D515A',
                                marginTop: '50px'
                            }}>
                            Cancel
                        </Button>
                        {/* Save Changes button */}
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            type="submit"
                            style={{
                                backgroundColor: '#E8843C', 
                                borderColor: '#E8843C', 
                                borderRadius: '30px', 
                                fontFamily: 'Arial', 
                                paddingLeft: '15px', 
                                paddingRight: '15px', 
                                marginRight: '60px',
                                marginBottom: '50px'
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
