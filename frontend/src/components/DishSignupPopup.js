import React, { useState } from 'react';
import { Container, Row, Form, Button, Col, Image, Card } from 'react-bootstrap';
import '../styles/modal.css';
import axios from 'axios';

const DishSignupPopup = ({ onClose, onSignup, userId, categoryName, eventId, dishName }) => {

    // const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [allergens, setAllergens] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [dishId, setDishId] = useState('');
    const [showRecommendationsForm, setShowRecommendationsForm] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false); // State for showing recommendations

    const handleRecommendationsFormClick = () => {
        setShowRecommendationsForm(true);
    };

    const handleRecommendationsClick = () => {
        setShowRecommendations(true); // Show recommendations when clicked
    };

    const handleBackClick = () => {
        setShowRecommendationsForm(false);
    };

    const handleSignup = async () => {
        if (!eventId) {
            const dishData = {
                dishId: dishId,
                userId: userId
            };
    
            try {
                const response = await axios.put(`http://localhost:8000/api/events/${eventId}`, dishData);
                console.log('Dish sign up successfull');
                onSignup(response.data._id); 
            } catch (error) {
                console.error('Error creating dish: ', error);
            }
        } 
        
        if (dishId) {
            onSignup(dishId);
        }
        
        onClose();
    };

    const handleRadioChange = (dishId) => {
        setDishId(dishId);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '700px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            <Row>
                                <Col xs={7}>
                                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Dish Sign Up</h2>
                                </Col>
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
                                                marginLeft: '90px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleRecommendationsFormClick}>
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
                                                marginLeft: '140px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleBackClick}>
                                            <Image src={process.env.PUBLIC_URL + '/left-arrow.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid /> Back
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                            
                            <hr style={{ borderTop: '1px solid #ccc' }} />

                                {showRecommendationsForm ? (
                                    !showRecommendations ? (
                                    <div>
                                    <Form.Group style={{marginBottom: '10px'}}>
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                    Fill out the following details to explore dishes tailored just for you based on your preferences and dietary needs.
                                </Form.Text>   
                                </Form.Group> <br />
                                    <Row>
                                        <Col>
                                        <Form.Group controlId="preparationTime">
                                            <Form.Label>Preparation Time (mins)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Preparation Time"
                                                    min={1} // Set minimum value (optional)
                                                    max={200} // Set maximum value
                                                />
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
                                    </Row> <br />

                                    <Row>
                                        <Col xs={9}>
                                        </Col>
                                        <Col  xs={3}>
                                        <Button
                                            style={{
                                                borderRadius: '30px',
                                                fontFamily: 'Arial',
                                                color: '#4D515A',
                                                backgroundColor: 'transparent',
                                                border: '1px solid #4D515A',
                                                paddingLeft: '19px',
                                                paddingRight: '19px',
                                                alignSelf: 'flex-end',
                                                marginLeft: '23px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleRecommendationsClick}
                                            >
                                            Recommend
                                        </Button>
                                        </Col>
                                    </Row> 
                                    </div>
                                    ) : (
                                    <div>
                                        <Form.Group>
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                Here are our top 3 recommended dishes for you to bring to the potluck, each carefully curated to delight everyone's taste buds and add to the festive ambiance of the gathering. Please select the dish you wish to sign up for.
                                </Form.Text> 
                                </Form.Group> <br />
                                        <Row>

                                        {/* <Form>
                                            {dishes.map((dish, index) => (
                                                <div key={index} className="mb-3">
                                                <Form.Check
                                                    type="radio"
                                                    id={`dish-${index}`}
                                                    name="selectedDish" // Group radio buttons by giving them the same name
                                                    label={
                                                        <Card key={index} style={{  marginLeft: '20px' }}>
                                                            <Card.Body style={{ fontSize: '12px', width: '620px' }}>
                                                            <Row>
                                                                <Col xs={2}>
                                                                    <Image src={process.env.PUBLIC_URL + '/salad.png'} style={{ maxWidth: '90px' }} fluid />
                                                                    </Col>
                                                                        <Col xs={10}>
                                                                            <Card.Title style={{ fontSize: '16px' }}>{dish.dishName}</Card.Title>
                                                                            <Card.Text style={{ color: 'gray', fontSize: '12px' }}>{dish.description}</Card.Text>
                                                                            <Card.Text>
                                                                                <strong>Ingredients:</strong> {dish.ingredients.join(', ')} <br />
                                                                                    {dish.dietaryRestrictions.length > 0 ? (
                                                                                        <div><strong>Dietary Restrictions:</strong> {dish.dietaryRestrictions.join(', ')}</div>
                                                                                    ) : (
                                                                                        <div><strong>Dietary Restrictions:</strong> None</div>
                                                                                    )}
                                                                                    {dish.allergens.length > 0 ? (
                                                                                        <div><strong>Allergens:</strong> {dish.allergens.join(', ')}</div>
                                                                                    ) : (
                                                                                        <div><strong>Allergens:</strong> None</div>
                                                                                    )}
                                                                                <strong>Preparation Time:</strong> {dish.preparationTime} minutes | <strong>Complexity:</strong> {dish.complexity} | <strong>Popularity:</strong> {dish.popularity}
                                                                            </Card.Text>  
                                                                        </Col>
                                                            </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    }
                                                    onChange={ () => handleRadioChange(dish._id) }
                                                />
                                                </div>
                                             ))}
                                        </Form> */}
                                    
                                        </Row>
                                    </div>  )
                            ) : (

                            <Form>
                                <Form.Group style={{}}>
                                <Form.Text style={{ color: 'gray', fontSize: '13px'}}>
                                    Click 'Recommend Dishes' to explore dishes tailored just for you based on your preferences and dietary needs.
                                </Form.Text> 
                                </Form.Group> <br />

                                {/* <Form.Group controlId="dishName">
                                    <Form.Label>Dish Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter dish name"
                                        value={dishName}
                                        onChange={(e) => setDishName(e.target.value)}
                                    />
                                </Form.Group> <br /> */}

                                {/* <Form.Group controlId="dishDescription">
                                    <Form.Label>Dish Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter dish description (optional)"
                                        value={dishDescription}
                                        onChange={(e) => setDishDescription(e.target.value)}
                                    />
                                </Form.Group> <br /> */}

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
                                onClick={handleSignup}
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
