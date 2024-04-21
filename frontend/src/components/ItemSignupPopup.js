import React, { useState } from 'react';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ItemSignupPopup = ({ onClose, userId, item }) => {
    const [slotCount, setSlotCount] = useState(null);


     // Function to handle form submission
     const handleSignupItem = async () => {
        try {
            Array.from({ length: slotCount }, () =>
                axios.put(`http://localhost:8000/api/items/${item._id}/signup`, { userId: userId })
            );
            onClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                    <Container style={{ width: '500px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                        <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Item Signup</h2>
                        <hr style={{ borderTop: '1px solid #ccc'}} />

                        <Form>
                            <Form.Group>
                            <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                Get ready to bring your flavor to the table. Whether it's mouth-watering dishes or essential utensils, let's make this event unforgettable together. <br /> <br />
                                Sign up for your item now and let the feast begin!
                            </Form.Text>
                            </Form.Group> <br/>
                            <Row>
                                <Col xs={6}>
                                <Form.Group className="row align-items-center">
                                    <Form.Label className="col-auto">Slot count</Form.Label>
                                    <Form.Control
                                        className="col"
                                        type="number"
                                        min={0}
                                        max={item.slot_count}
                                        defaultValue={0} // Set initial value
                                        onChange={(e) => setSlotCount(e.target.value)} // Handle changes
                                    />
                                </Form.Group>
                                </Col>
                            </Row>
                            <br/>
                        </Form>
                        <hr style={{ borderTop: '1px solid #ccc'}} />
                        
                        <div className="modal-footer">
                            <Button
                                variant="primary"
                                onClick={onClose}
                                style={{
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    borderRadius: '30px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontFamily: 'Arial',
                                    color: '#4D515A',
                                    marginTop: '10px',
                                }}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSignupItem}
                                style={{
                                    backgroundColor: '#E8843C',
                                    borderColor: '#E8843C',
                                    borderRadius: '30px',
                                    fontFamily: 'Arial',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    marginTop: '10px',
                                }}>
                                    Signup
                            </Button>
                        </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemSignupPopup;