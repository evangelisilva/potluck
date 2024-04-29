import React, { useState } from 'react';
import { Navbar, Nav, Image, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    allergens: [],
    dietaryRestrictions: [],
  });

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

  const { firstName, lastName, email, password, allergens, dietaryRestrictions } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (selectedOptions, name) => {
    if (name === 'allergens') {
      const allergenLabels = selectedOptions.map(option => option.label);
      setFormData({ ...formData, allergens: allergenLabels });
    } else if (name === 'dietaryRestrictions') {
      setFormData({ ...formData, dietaryRestrictions: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: selectedOptions[0] });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://ec2-3-133-58-38.us-east-2.compute.amazonaws.com:8000/api/users/signup', formData);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="px-lg-5 fixed-top" style={{ paddingTop: '15px', zIndex: '1000', backgroundColor: '#fff', fontFamily: 'Arial' }}>
        <Navbar.Brand>
          <NavLink href="/">
            <Image
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="Logo"
              style={{ maxHeight: '45px', paddingRight: '15px' }}
            />
            <span style={{ color: '#4D515A', fontSize: '21px' }}>Potluck</span>
          </NavLink>
        </Navbar.Brand>
      </Navbar>
      <Container style={{ paddingRight: '24%', paddingLeft: '24%', paddingTop: '5%' }}>
        <h2 style={{ fontFamily: 'Times New Roman', fontSize: '50px' }}>Create an Account</h2> <br />
        {error && <p style={{ color: 'red', fontSize: '15px' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' name='firstName' value={firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} autoComplete="true" required />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' name='lastName' value={lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} autoComplete="true" required />
              </Col>
            </Row>
          </Form.Group> <br />
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' name='email' value={email} onChange={e => setFormData({ ...formData, email: e.target.value })} autoComplete="true" required />
          </Form.Group> <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: '400px' }}
                  autoComplete='true'
                  minLength='7'
                  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
                  title='Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                  required
                />
              </Col>
              <Col>
                <Button variant="light" onClick={toggleShowPassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </Col>
            </Row>
          </Form.Group> <br />
          <Form.Group>
            <Form.Label>Allergens</Form.Label>
            <Typeahead
              id='allergens'
              name='allergens'
              multiple
              options={allergenOptions}
              placeholder='Enter your allergens (if any)'
              onChange={(selectedOptions) => handleChange(selectedOptions, 'allergens')}
            />
          </Form.Group> <br />
          <Form.Group>
            <Form.Label>Dietary Restrictions</Form.Label>
            <Typeahead
              id='dietaryRestrictions'
              name='dietaryRestrictions'
              multiple
              options={dietaryRestriction}
              placeholder='Enter your Dietary Restrictions (if any)'
              onChange={(selectedOptions) => handleChange(selectedOptions, 'dietaryRestrictions')}
            />
          </Form.Group> <br />
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: '#E8843C',
              borderColor: '#E8843C',
              borderRadius: '30px',
              fontFamily: 'Arial',
              paddingLeft: '15px',
              paddingRight: '15px',
              marginRight: '60px',
              width: '100%',
              height: '42px'
            }}> Create an Account
          </Button>
        </Form> <br />
        <p style={{ textAlign: 'center' }}>
          Already have an account?
          <a href='/signin' style={{ margin: '5px', color: 'black', fontWeight: 'bold' }}>Sign In</a>
        </p>
      </Container>
    </div>
  );
};

const NavLink = ({ href, isActive, children }) => (
  <Nav.Link href={href} style={{ fontWeight: isActive ? 'bold' : '', paddingRight: '45px' }}>
    <span style={{ fontFamily: 'Arial', color: '#4D515A', fontSize: '17px' }}>{children}</span>
  </Nav.Link>
);

export default SignupPage;
