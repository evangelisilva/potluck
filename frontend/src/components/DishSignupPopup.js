import React, { useState } from 'react';
import { Container, Row, Form, Button, Col, Image, Card } from 'react-bootstrap';
import '../styles/modal.css';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const DishSignupPopup = ({ onClose, userId, eventId, onSignup }) => {

    const [itemName, setItemName] = useState('');
    const [categoryName, setcategoryName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [slotCount, setSlotCount] = useState('');
    const [quantity, setQuantity] = useState('');
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

    const categories = ['Appetizer', 'Main course', 'Dessert', 'Beverage', 'Side Dish', 'Salad', 'Utensils', 'Other'];
    const courses = ['Appetizer', 'Main course', 'Dessert', 'Side Dish'];

    const allergen = [
        'Milk', 'Eggs', 'Peanuts', 'Tree nuts', 'Fish', 'Shellfish', 'Soy', 'Wheat', 'Sesame seeds', 'Sulfites', 'Mustard', 'Celery', 'Lupin', 'Molluscs', 'Gluten',
        'Crustaceans', 'Soybeans', 'Corn', 'Beef', 'Pork', 'Chicken', 'Lamb', 'Turkey', 'Rabbit', 'Venison', 'Game meats', 'Honey', 'Garlic', 'Onions', 'Scallions',
        'Leeks', 'Chives', 'Asparagus', 'Artichokes', 'Spinach', 'Kale', 'Collard greens', 'Broccoli', 'Cauliflower', 'Brussels sprouts', 'Cabbage', 'Carrots',
        'Beets', 'Radishes', 'Turnips', 'Parsnips', 'Rutabagas', 'Potatoes', 'Sweet potatoes', 'Yams', 'Taro', 'Cassava', 'Plantains', 'Bananas', 'Apples', 'Pears',
        'Peaches', 'Plums', 'Apricots', 'Cherries', 'Berries (strawberries, raspberries, blueberries, blackberries)', 'Grapes', 'Citrus fruits (oranges, lemons, limes, grapefruits)',
        'Melons (watermelon, cantaloupe, honeydew)', 'Pineapple', 'Mangoes', 'Papayas', 'Coconut', 'Avocado', 'Tomatoes', 'Bell peppers', 'Cucumbers', 'Zucchini', 'Eggplant',
        'Squash (butternut squash, acorn squash, spaghetti squash)', 'Beans (black beans, kidney beans, chickpeas, lentils)', 'Peas', 'Corn', 'Soy products (tofu, tempeh)',
        'Nuts (almonds, walnuts, cashews, pecans)', 'Seeds (sunflower seeds, pumpkin seeds, chia seeds)', 'Grains (quinoa, rice, oats, barley)', 'Flours (wheat flour, almond flour, coconut flour)',
        'Dairy products (milk, cheese, yogurt, butter)', 'Meat (beef, pork, chicken, lamb, turkey)', 'Seafood (fish, shellfish)', 'Processed foods (packaged snacks, frozen meals, canned goods)',
        'Food additives (artificial colors, flavors, preservatives)',
      ];
    
      const dietaryRestriction = [
        'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Shellfish-Free', 'Soy-Free', 'Egg-Free', 'Paleo', 'Keto', 'Low-FODMAP', 'Halal',
        'Kosher', 'Pescatarian', 'Raw Food', 'Low-Sodium', 'Sugar-Free', 'Organic', 'Non-GMO', 'Whole30-compliant'
      ];

      const allergenOptions = allergen.map(option => ({ label: option, value: option }));
      const dietaryRestrictionOptions = dietaryRestriction.map(option => ({ label: option, value: option }));

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
          axios.post(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/dishSignups/recommendDishes/${userId}`, recommendationData)
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
    
    const handleChange = (selectedOptions, name) => {
        if (name === 'allergens') {
          setAllergens(selectedOptions.map(option => option.label));
        } else if (name === 'dietaryRestrictions') {
          setDietaryRestrictions(selectedOptions.map(option => option.label));
        }
      };

    const handleAddItem = async () => {
       
            const dishData = {
                name: itemName,
                category: itemCategory,
                notes: itemDescription,
                allergens: allergens,
                dietaryRestrictions: dietaryRestrictions,
                slot_count: slotCount,
                quantity: quantity
            };
    
            try {
                const response = await axios.post(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/items/${eventId}`, dishData);
                console.log(response);
                onClose();
                window.location.reload();
            } catch (error) {
                console.error('Error creating dish: ', error);
            }
        
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
                                <Col xs={6}>
                                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '7px' }}>Add Items</h2>
                                </Col>
                                <Col xs={6}>
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
                                                marginLeft: '120px',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleRecommendationsFormClick}>
                                            Recommend Dish Items
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
                                                marginLeft: '200px',
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
                                        </Row><br/>
                                        <Row>
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
                                        <Col>
                                            <Form.Group>
                                            <Form.Label>Meal Course</Form.Label>
                                           <Form.Select
                                            defaultValue=""
                                            required
                                            value={ categoryName }
                                            onChange={(e) => setcategoryName(e.target.value)}
                                        >
                                            <option value="" disabled hidden></option>
                                            {courses.map((course, index) => (
                                                <option key={index} value={course}>
                                                    {course}
                                                </option>
                                            ))}
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
                                        
                                        
                                        {(recommendedDishes.data === undefined || recommendedDishes.cuisinesMatch == undefined) ?
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
                                                                                {/* Condition for whether you have a cuisine match: if true, don't put anything, otherwise, display what the cusines are and say they don't match those of theis event*/}
                                                                                {(recommendedDishes.cuisinesMatch[index] == true) ? 
                                                                                    (<div></div>) :
                                                                                    (<div><strong>Cuisines: </strong>The cusines of this dish don't match any of those of the event. They are: <strong>{dish.cuisines.join(', ')}</strong></div>)}
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
                                    Click 'Recommend Dishe Items' to explore dishes tailored just for you based on your preferences and dietary needs.
                                </Form.Text> 
                                </Form.Group> <br />

                                <Form.Group controlId="dishName">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter item name"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                </Form.Group> <br />

                                <Form.Group controlId="dishDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter description (optional)"
                                        rows={3} 
                                        onChange={(e) => setItemDescription(e.target.value)}
                                    />
                                </Form.Group> <br />

                                <Form.Group controlId="dishName">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                            defaultValue=""
                                            required
                                            value={itemCategory}
                                            onChange={(e) => setItemCategory(e.target.value)}
                                        >
                                            <option value="" disabled hidden></option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group> <br />

                                { itemCategory === 'Appetizer' || itemCategory === 'Main course' || itemCategory === 'Dessert' ||
                                  itemCategory === 'Beverage' || itemCategory === 'Side Dish' || itemCategory === 'Salad' ? (
                                    <>
                                        <Form.Group controlId="allergens">
                                            <Form.Label>Allergens</Form.Label>
                                            <Typeahead
                                            id='allergens'
                                            name='allergens'
                                            multiple
                                            options={allergenOptions}
                                            placeholder='Enter your allergens (if any)'
                                            onChange={(selectedOptions) => handleChange(selectedOptions, 'allergens')}
                                            />
                                        </Form.Group>
                                        <br />
                                        <Form.Group controlId="dietaryRestrictions">
                                            <Form.Label>Dietary Restrictions</Form.Label>
                                            <Typeahead
                                            id='dietaryRestrictions'
                                            name='dietaryRestrictions'
                                            multiple
                                            options={dietaryRestrictionOptions}
                                            placeholder='Enter dietary restrictions (if any)'
                                            onChange={(selectedOptions) => handleChange(selectedOptions, 'dietaryRestrictions')}
                                            />
                                        </Form.Group>
                                        <br />
                                    </>
                                ) : null}

                                <Row>
                                    <Col>
                                            <Form.Group controlId="dishDescription">
                                            <Form.Label>Slot count</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter slot count"
                                                value={slotCount}
                                                onChange={(e) => setSlotCount(e.target.value)}
                                                required
                                            />
                                        </Form.Group> 
                                    </Col>
                                    <Col>
                                            <Form.Group controlId="dishDescription">
                                            <Form.Label>Quantity per slot</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter quantity per slot"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
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
                                    color: '#4D515A',
                                    marginTop: '10px',
                                    marginBottom: '30px'
                                }}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAddItem}
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
                                    Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishSignupPopup;
