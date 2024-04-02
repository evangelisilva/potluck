import React, { useState } from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';

// This component renders a form for creating a new event.
function NewEventPage1({ handleEventDataChange }) {
    // State variable to track the selected visibility option
    const [visibility, setVisibility] = useState('public');

    // Function to handle changes in the visibility option
    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col md={7} style={{ paddingTop: '50px', paddingLeft: '70px', color: '#4D515A', fontFamily: 'Arial' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '20px' }}>Start a Potluck</h2>
                    <Form.Group>
                        {/* Event Name */}
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            style={{ width: '576px' }}
                            onChange={(e) => handleEventDataChange('title', e.target.value)}
                            required
                        />
                        {/* Event Name Description */}
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            Example: Smith Family Reunion, Sunday Morning Brunch
                        </Form.Text>
                        <br /><br />

                        {/* Event Description */}
                        <Form.Label>Description (Optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3} 
                            style={{ width: '576px', height: '120px' }}
                            onChange={(e) => handleEventDataChange('description', e.target.value)}
                        />
                        {/* Event Description Note */}
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            This information will be displayed at the top of the event page, visible to all attendees.
                        </Form.Text>
                        <br /><br />

                        <Row style={{ width: '590px' }}>
                            <Col style={{ paddingRight: '14px', maxWidth: '400px' }}>
                                {/* Cover Image Upload */}
                                <Form.Label>Cover Image (Optional)</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    custom accept="image/*" 
                                    style={{ width: '100%' }} 
                                    onChange={(e) => handleEventDataChange('coverImage', e.target.value)}
                                />
                                {/* Cover Image Upload Note */}
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                    For best results please use a landscape photo.
                                </Form.Text>
                            </Col>
                            <Col style={{ paddingLeft: '0', paddingRight: '0', maxWidth: '200px' }}>
                                {/* Visibility selection */}
                                <Form.Label>Event Visibility</Form.Label> <br/>
                                <Form.Select 
                                    value={visibility} 
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        // Call both functions
                                        handleVisibilityChange(value);
                                        handleEventDataChange('visibility', value);
                                    }} 
                                    style={{ width: '100%' }}
                                    name="visibility"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </Form.Select>       
                            </Col>
                        </Row>

                        <br />

                        {/* Event Date, Start Time, End Time */}
                        <Row style={{ maxWidth: '600px' }}>
                            {/* Event Date */}
                            <Col style={{ paddingRight: '12px' }}>
                                <Form.Label>Date</Form.Label> 
                                <Form.Control 
                                    type="date"
                                    style={{ width: '190px' }}
                                    onChange={(e) => handleEventDataChange('date', e.target.value)}
                                    required
                                />
                            </Col>
                            {/* Event Start Time */}
                            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <Form.Label>Start Time</Form.Label> 
                                <Form.Control 
                                    type="time"
                                    style={{ width: '180px' }}
                                    onChange={(e) => handleEventDataChange('startTime', e.target.value)}
                                    required
                                />
                            </Col>
                            {/* Event End Time */}
                            <Col>
                                <Form.Label>End Time</Form.Label> 
                                <Form.Control 
                                    type="time"
                                    style={{ width: '180px' }}
                                    onChange={(e) => handleEventDataChange('endTime', e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                {/* Right column */}
                <Col md={5}>
                    <Image src={process.env.PUBLIC_URL + '/img_1.jpg'} style={{ paddingTop: '60px', paddingRight: '80px' }} fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default NewEventPage1;
