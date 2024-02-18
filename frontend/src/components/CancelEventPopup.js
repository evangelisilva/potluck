import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import '../styles/modal.css';

const CancelEventPopup = ({ onClose }) => {

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{height: '45%'}}>
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '525px', margin: '50px', color: '#4D515A' }}>
                            <h2 style={{ fontFamily: 'Aleo', fontSize: '45px', marginBottom: '15px' }}>Cancel or Delete Event</h2>
                            <hr style={{ borderTop: '1px solid #ccc'}} />

                            <Form>
                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label style={{ width: '450px' }}>Cancel Event</Form.Label>
                                            <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                               If you cancel your event, guests will be notified. You'll be able to access the event page but won't be able to edit the event.
                                            </Form.Text>
                                        </Col>
                                        <Col>
                                            <Form.Check  type="radio" name="Radios" id="Radio2" />
                                        </Col>
                                    </Row><br/>

                                    <Row>
                                        <Col>
                                            <Form.Label style={{ width: '450px' }}>Delete Event</Form.Label>
                                            <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                               If you delete your event, you won't be able to access it again. If you'll want to come back to it, you can cancel your event instead.
                                            </Form.Text>
                                        </Col>
                                        <Col>
                                        <Form.Check  type="radio" name="Radios" id="Radio2" />
                                        </Col>
                                    </Row>
                                    
                                </Form.Group>
                        </Form>
                        </Container>


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
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onClose}
                            type="submit"
                            style={{
                                backgroundColor: '#E8843C', 
                                borderColor: '#E8843C', 
                                borderRadius: '30px', 
                                fontFamily: 'Inter', 
                                paddingLeft: '15px', 
                                paddingRight: '15px', 
                                marginRight: '60px' 
                            }}>
                            Confirm
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelEventPopup;