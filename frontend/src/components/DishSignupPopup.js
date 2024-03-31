import React, { useState } from 'react';
import { Container, Row, Form, Button, Col, Image, Card } from 'react-bootstrap';
import '../styles/modal.css';
import axios from 'axios';

const DishSignupPopup = ({ onClose, onSignup, userId, categoryName, eventId }) => {

    const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [allergens, setAllergens] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [dishId, setDishId] = useState('');
    const [showRecommendationsForm, setShowRecommendationsForm] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false); // State for showing recommendations

    // set state values for the user preferences
    const [prepTime, setPrepTime] = useState(0);
    const [complexity, setComplexity] = useState('');
    const [popularity, setPopularity] = useState('');

    const [recommendedDishes, setRecommendedDishes] = useState({})

    // Handlers for these user preferences
      // Handler function to update prepTime state
    const handlePrepTimeChange = (event) => {
      setPrepTime(parseInt(event.target.value)); // Convert to integer if necessary
    };

    // Handler function to update complexity state
    const handleComplexityChange = (event) => {
      setComplexity(event.target.value);
    };

    // Handler function to update popularity state
    const handlePopularityChange = (event) => {
      setPopularity(event.target.value);
    };


    const handleRecommendationsFormClick = () => {
        setShowRecommendationsForm(true);
    };

    // Jacob's work here
    const handleRecommendationsClick = () => {

        // Before setting show recommendations to true, the dish recommendations should be fetched

        
        const recommendationData = {
            eventId: eventId,
            // can be taken from the..."categoryName"
            mealCourse: categoryName,
            preferredPrepTime: prepTime,
            preferredComplexity: complexity,
            preferredPopularity: popularity
        }
        
        
          // Do an axios post request (preqreq: change the route in routes to be a post instead of get)
          axios.post(`http://localhost:8000/api/dishSignups/recommendDishes/${userId}`, recommendationData)
          .then(response => {
            // Handle success, if needed
            console.log("Dish recommendation response: ");
            // this data element should give the list of dishes recommended
            console.log(response.data);
            // Assign the data from the API to the response(so you can access the DATA attribute for checking if undefed)
            setRecommendedDishes(response.data)
          })
          .catch(error => {
            // Handle error, if needed
            console.error(error);
          });

        setShowRecommendations(true); // Show recommendations when clicked

    };

    const handleBackClick = () => {
        setShowRecommendationsForm(false);
    };

    
    const dishes = [
        {
            _id: '12345',
            dishName: 'Spaghetti Carbonara',
            description: 'Pasta with creamy sauce, pancetta, and Parmesan cheese.',
            ingredients: ['Pasta', 'Cream', 'Pancetta', 'Parmesan Cheese'],
            dietaryRestrictions: [],
            allergens: ['Dairy', 'Pork'],
            cuisines: ['Italian'],
            preparationTime: 30, // in minutes
            complexity: 'Medium',
            popularity: 'High'
        }, 
        {
            _id: '12345',
            dishName: 'Caesar Salad',
            description: 'Romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
            ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan Cheese'],
            dietaryRestrictions: ['Vegetarian'],
            allergens: ['Dairy', 'Gluten'],
            cuisines: ['American'],
            preparationTime: 15, // in minutes
            complexity: 'Low',
            popularity: 'Medium'
        }, 
        {
            _id: '12345',
            dishName: 'Chicken Tikka Masala',
            description: 'Grilled chicken in a spicy tomato-based sauce with Indian spices.',
            ingredients: ['Chicken', 'Tomato Sauce', 'Indian Spices'],
            dietaryRestrictions: [],
            allergens: [],
            cuisines: ['Indian'],
            preparationTime: 45, // in minutes
            complexity: 'High',
            popularity: 'High'
        }
    ]
    

    


    
    const handleSignup = async () => {
        if (!dishId) {
            const allergensArray = allergens ? allergens.split(',').map(item => item.trim()) : [];
            const dietaryRestrictionsArray = dietaryRestrictions ? dietaryRestrictions.split(',').map(item => item.trim()) : [];

            const dishData = {
                dishName: dishName,
                description: dishDescription,
                allergens: allergensArray,
                dietaryRestrictions: dietaryRestrictionsArray,
                course: categoryName,
            };
    
            try {
                const response = await axios.post(`http://localhost:8000/api/dishes/`, dishData);
                console.log('Dish created successfully');
                setDishId(response.data._id); // Assuming the ID is in response.data
            } catch (error) {
                console.error('Error creating dish: ', error);
            }
        }

        onSignup(dishId);
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
                                                    value={prepTime}
                                                    onChange={handlePrepTimeChange}
                                                    min={1} // Set minimum value (optional)
                                                    max={200} // Set maximum value
                                                />
                                        </Form.Group>  
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Complexity</Form.Label>
                                            <Form.Select defaultValue="Choose..." value={complexity} onChange={handleComplexityChange}>
                                                <option>Choose...</option>
                                                {/* Add options */}
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </Form.Select>
                                            </Form.Group>
                                        
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Popularity</Form.Label>
                                            <Form.Select defaultValue="Choose..." value={popularity} onChange={handlePopularityChange}>
                                                <option>Choose...</option>
                                                {/* Add options */}
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
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

                                        {/* Display this form conditionally on whether you have the data*/}
                                        
                                        
                                        {(recommendedDishes.data === undefined) ?
                                            (<div>
                                                <h1>Loading dishes...</h1>
                                            </div>) :
                                            (<div>
                                               <Form>
                                            {recommendedDishes.data.map((dish, index) => (
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
                                        </Form>
                                            </div>
                                            )
                                        }

                                        
                                    
                                        </Row>
                                    </div>  )
                            ) : (

                            <Form>
                                <Form.Group style={{}}>
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

                                <Form.Group controlId="dishDescription">
                                    <Form.Label>Dish Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter dish description (optional)"
                                        value={dishDescription}
                                        onChange={(e) => setDietaryRestrictions(e.target.value)}
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
