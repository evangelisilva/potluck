import React, { useState } from 'react';
import { Modal, Button, Container, Form, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const ItemSignupPopup = ({ onClose, userId, item, eventOrganizer }) => {
    const [slotCount, setSlotCount] = useState(null);
    const [showSignupForm, setShowSignupForm] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);

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
                        <Container style={{ width: '650px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            <Row>
                                {/* <Col xs={9}> */}
                                <h2 style={{ fontFamily: 'Times New Roman', fontSize: '40px', marginBottom: '15px' }}>{item.name}</h2>
                                {/* </Col> */}
                                {/* <Col xs={3}>
                                {eventOrganizer === userId && (
                                    <>
                                        <Button
                                            variant="primary"
                                            style={{
                                                border: 'None',
                                                backgroundColor: "transparent",
                                                color: '#4D515A',
                                                fontSize: '15px',
                                                marginLeft: '25%',
                                                cursor: 'pointer', // Add cursor style
                                            }}
                                        >
                                            <Image src={process.env.PUBLIC_URL + '/edit.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                        </Button>
                                        <Button
                                            variant="primary"
                                            style={{
                                                border: 'None',
                                                backgroundColor: "transparent",
                                                color: '#4D515A',
                                                fontSize: '15px',
                                                cursor: 'pointer', // Add cursor style
                                            }}
                                        >
                                            <Image src={process.env.PUBLIC_URL + '/delete.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                        </Button>
                                    </>
                                )}
                                </Col> */}
                            </Row>
                            
                            <hr style={{ borderTop: '1px solid #ccc' }} />
                            {!showSignupForm ? ( // Display signup form only when showSignupForm is false
                                <>
                                    <Row>
                                        <Col>
                                            <img src={item.image} style={{ maxWidth: "300px" }} />
                                        </Col>
                                        <Col>
                                            <p>{item.notes}</p>
                                            {item.allergens && item.allergens.length > 0 && <p><b>Allergens: </b>{item.allergens.join(', ')}</p>}
                                            {item.dietary_restrictions && item.dietary_restrictions.length > 0 && <p><b>Dietary Restrictions: </b>{item.dietary_restrictions}</p>}
                                        </Col>
                                    </Row>
                                    <hr style={{ borderTop: '1px solid #ccc' }} />
                                    
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
                                                marginLeft: '10px',
                                            }}>
                                            Close
                                        </Button>
                                        {item.slot_count !== item.signups.length &&
                                        <Button
                                            variant="primary"
                                            onClick={() => setShowSignupForm(true)} // Show signup form on button click
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
                                        </Button>}
                                    </div>
                                </>
                            ) : (
                                <Form>
                                    <Form.Group>
                                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                            Get ready to bring your flavor to the table. Whether it's mouth-watering dishes or essential utensils, let's make this event unforgettable together. <br /> <br />
                                            Sign up for the item now and let the feast begin! 
                                        </Form.Text>
                                    </Form.Group> <br/>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group className="row align-items-center">
                                            <Form.Text style={{ color: 'gray', fontSize: '13px', marginBottom: '5px' }}>
                                                {item.slot_count - item.signups.length} out of {item.slot_count} slots available (each serving {item.quantity} portions)
                                                </Form.Text>
                                                <Form.Label className="col-auto">Slot count</Form.Label>
                                                <Form.Control
                                                    className="col"
                                                    type="number"
                                                    min={0}
                                                    max={item.slot_count - item.signups.length}
                                                    defaultValue={0} // Set initial value
                                                    onChange={(e) => setSlotCount(e.target.value)} // Handle changes
                                                />
                                                
                                                 {/* <p><br/>{item.slot_count - item.signups.length} out of {item.slot_count} slots available (each serving {item.quantity} portions)</p> */}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br />
                                    <div className="modal-footer">
                                        <Button
                                            variant="primary"
                                            onClick={() => setShowSignupForm(false)} // Hide signup form on button click
                                            style={{
                                                paddingLeft: '20px',
                                                paddingRight: '20px',
                                                borderRadius: '30px',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                fontFamily: 'Arial',
                                                color: '#4D515A',
                                                marginTop: '10px',
                                                marginLeft: '10px',
                                            }}>
                                            Cancel
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
                                </Form>
                            )}
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemSignupPopup;
