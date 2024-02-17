import React from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';

// This component renders a form for specifying the location of the event.
function NewEventPage2() {
    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col md={7} style={{ paddingTop: '50px', paddingLeft: '70px', color: '#4D515A', fontFamily: 'Inter' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Aleo', fontSize: '45px', marginBottom: '20px' }}>Where is the event happening?</h2>
                    <Form.Group>
                        {/* Street Address */}
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control 
                            type="text" 
                            style={{ width: '576px', marginBottom: '8px' }}
                            required
                        /> 
                        <Form.Control 
                            type="text" 
                            style={{ width: '576px' }}
                        />
                        <br />

                        {/* City, State, Zip code */}
                        <Row style={{ maxWidth: '600px' }}>
                            <Col style={{ paddingRight: '12px' }}>
                                <Form.Label>City</Form.Label> 
                                <Form.Control 
                                    type="text"
                                    style={{ width: '190px' }}
                                    required
                                />
                            </Col>
                            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <Form.Label>State</Form.Label> 
                                <Form.Control 
                                    type="text"
                                    style={{ width: '180px' }}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label>Zip code</Form.Label> 
                                <Form.Control 
                                    type="text"
                                    style={{ width: '180px' }}
                                    required
                                />
                            </Col>
                        </Row>
                        <br />

                        {/* Phone (Optional) */}
                        <Form.Label>Phone (Optional)</Form.Label>
                        <Form.Control 
                            type="text" 
                            style={{ width: '576px', marginBottom: '8px' }}
                        />
                    </Form.Group>
                </Col>
                {/* Right column */}
                <Col md={5}>
                    <Image src={process.env.PUBLIC_URL + '/img_2.jpg'} style={{ paddingTop: '60px', paddingRight: '80px' }} fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default NewEventPage2;
