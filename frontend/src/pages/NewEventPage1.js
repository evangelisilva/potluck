import React from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';

// This component renders a form for creating a new event.
function NewEventPage1() {
    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col md={7} style={{ paddingTop: '50px', paddingLeft: '70px', color: '#4D515A', fontFamily: 'Inter' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Aleo', fontSize: '45px' }}>Start a Potluck</h2>
                    <Form.Group>
                        {/* Event Name */}
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            style={{ width: '576px' }}
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
                        />
                        {/* Event Description Note */}
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            This will appear at the top of the event page, visible to everyone in attendance.
                        </Form.Text>
                        <br /><br />

                        {/* Cover Image Upload */}
                        <Form.Label>Cover Image (Optional)</Form.Label>
                        <Form.Control type="file" custom accept="image/*" style={{ width: '576px' }} />
                        {/* Cover Image Upload Note */}
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            For best results please use a landscape photo (wider than it is tall)
                        </Form.Text>
                        <br /><br />

                        {/* Event Date, Start Time, End Time */}
                        <Row style={{ maxWidth: '600px' }}>
                            {/* Event Date */}
                            <Col style={{ paddingRight: '12px' }}>
                                <Form.Label>Date</Form.Label> 
                                <Form.Control 
                                    type="date"
                                    style={{ width: '190px' }}
                                    required
                                />
                            </Col>
                            {/* Event Start Time */}
                            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <Form.Label>Start Time</Form.Label> 
                                <Form.Control 
                                    type="time"
                                    style={{ width: '180px' }}
                                    required
                                />
                            </Col>
                            {/* Event End Time */}
                            <Col>
                                <Form.Label>End Time</Form.Label> 
                                <Form.Control 
                                    type="time"
                                    style={{ width: '180px' }}
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
