import React, { useState } from 'react';
import { Container, Row, Form, Button, Col, Image } from 'react-bootstrap';
import '../styles/modal.css';

const DishSignupPopup = ({ onClose, onConfirm, userID, categoryName, eventId }) => {
    const [dishName, setDishName] = useState('');
    const [allergens, setAllergens] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [showRecommendationsForm, setShowRecommendationsForm] = useState(false);


    const handleRecommendationsClick = () => {
        setShowRecommendationsForm(true);
    };

    const handleBackClick = () => {
        setShowRecommendationsForm(false);
    };
    
    const handleConfirm = () => {
        const signupData = {
            userID: userID,
            categoryName: categoryName,
            dishName: dishName,
            allergens: allergens,
            dietaryRestrictions: dietaryRestrictions,
        };
        onConfirm(signupData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '525px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            <Row>
                                <Col xs={7}>
                                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Dish Sign Up</h2></Col>
                                <Col xs={5}>
                                 
                                {!showRecommendationsForm ? (
                                        <Button
                                            style={{
                                                borderRadius: '30px',
                                                fontFamily: 'Arial',
                                                color: '#4D515A',
                                                backgroundColor: 'transparent',
                                                border: '1px solid #4D515A',
                                                fontSize: '15px',
                                                paddingLeft: '19px',
                                                paddingRight: '19px',
                                                alignSelf: 'flex-end',
                                                marginLeft: '16px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleRecommendationsClick}
                                        >
                                            Recommend Dishes
                                        </Button>
                                    ) : (
                                        <Button
                                            style={{
                                                borderRadius: '30px',
                                                fontFamily: 'Arial',
                                                color: '#4D515A',
                                                backgroundColor: 'transparent',
                                                border: 'None',
                                                fontSize: '15px',
                                                paddingLeft: '19px',
                                                paddingRight: '19px',
                                                alignSelf: 'flex-end',
                                                marginLeft: '90px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleBackClick}
                                        >
                                            <Image src={process.env.PUBLIC_URL + '/left-arrow.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid /> Back
                                        </Button>
                                    )}

                                </Col>
                            </Row>
                            

                            <hr style={{ borderTop: '1px solid #ccc' }} />

                            {showRecommendationsForm ? (
                                <div>
                                    <Form.Group style={{marginBottom: '10px'}}>
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                    Fill out the following details to explore dishes tailored just for you based on your preferences and dietary needs.
                                </Form.Text>   
                                </Form.Group> <br />
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Preparation Time</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                 {/* Add options */}
                                            </Form.Select>
                                            </Form.Group>
                                        
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Complexity</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {/* Add options */}
                                            </Form.Select>
                                            </Form.Group>
                                        
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Popularity</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                {/* Add options */}
                                            </Form.Select>
                                            </Form.Group>
                                        
                                        </Col>
                                    </Row>

                                    <Button
                                            style={{
                                                // borderRadius: '30px',
                                                fontFamily: 'Arial',
                                                color: '#4D515A',
                                                backgroundColor: 'transparent',
                                                border: '1px solid #4D515A',
                                                fontSize: '15px',
                                                paddingLeft: '19px',
                                                paddingRight: '19px',
                                                alignSelf: 'flex-end',
                                                marginLeft: '16px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleRecommendationsClick}
                                        >
                                            Recommend Dishes
                                        </Button>
                                </div>
                            ) : (

                            <Form>
                                <Form.Group style={{marginBottom: '10px'}}>
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                    Click 'Recommend Dishes' to explore dishes tailored just for you based on your preferences and dietary needs.
                                </Form.Text> 
                                </Form.Group> <br />


                                <Form.Group controlId="dishName">
                                    <Form.Label>Dish Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter dish name"
                                        value={dishName}
                                        onChange={(e) => setDishName(e.target.value)}
                                    />
                                </Form.Group> <br />

                                <Form.Group controlId="allergens">
                                    <Form.Label>Allergens</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter allergens (if any)"
                                        value={allergens}
                                        onChange={(e) => setAllergens(e.target.value)}
                                    />
                                </Form.Group> <br />

                                <Form.Group controlId="dietaryRestrictions">
                                    <Form.Label>Dietary Restrictions</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter dietary restrictions (if any)"
                                        value={dietaryRestrictions}
                                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                                    />
                                </Form.Group>
                                
                            </Form>

                            

                            )}
                        </Container>

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
                                    marginRight: '10px',
                                    color: '#4D515A',
                                    marginTop: '10px',
                                    marginBottom: '30px'
                                }}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleConfirm}
                                style={{
                                    backgroundColor: '#E8843C',
                                    borderColor: '#E8843C',
                                    borderRadius: '30px',
                                    fontFamily: 'Arial',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    marginRight: '60px',
                                    marginTop: '10px',
                                    marginBottom: '30px'
                                }}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishSignupPopup;
