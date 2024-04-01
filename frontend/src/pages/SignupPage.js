import React, { useState } from 'react';
import { Navbar, Nav, Image, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, email, password } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/signup', formData);
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
                <NavLink href="/" >
                    <Image
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        alt="Logo"
                        style={{ maxHeight: '45px', paddingRight: '15px'}}
                    />
                    {/* Brand name */}
                    <span style={{ color: '#4D515A', fontSize: '21px' }}>Potluck</span>
                </NavLink>
                {/* Logo */}
            </Navbar.Brand>
        </Navbar>
    <Container style={{paddingRight: '24%', paddingLeft: '24%', paddingTop: '5%'}}>
    {/* Title */}
    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '50px'}}>Create an Account</h2> <br />
    {error && <p style={{ color: 'red', fontSize: '15px'}}>{error}</p>}
    {/* {error && (<Alert variant="danger" style={{ textAlign: 'center' }}> {error} </Alert>)} */}
    <Form onSubmit={handleSubmit}> 
        <Form.Group>
            <Row>
                <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' name='firstName' value={firstName} onChange={handleChange}autoComplete="true" required/>
                </Col>
                <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='text' name='lastName' value={lastName} onChange={handleChange} autoComplete="true" required/>
                </Col>
            </Row>
        </Form.Group> <br /> 
        <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' name='email' value={email} onChange={handleChange} autoComplete="true" required/>
        </Form.Group>  <br />   
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type='password' 
                name='password' 
                value={password} 
                onChange={handleChange}
                autoComplete='true' 
                minlength='7' 
                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$' 
                title='Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                required 
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
        </Button> <br /><br />
    </Form>
    <p style={{textAlign: 'center'}}>
        Already have an account? 
        <a href='/signin' style={{margin: '5px', color: 'black', fontWeight: 'bold'}}>Sign In</a>
    </p> 
    </Container>
    </div>
  );
};

// NavLink component definition
const NavLink = ({ href, isActive, children }) => (
    // Nav link with style and children
    <Nav.Link href={href} style={{ fontWeight: isActive ? 'bold' : '', paddingRight: '45px' }}>
      {/* Link text */}
      <span style={{ fontFamily: 'Arial', color: '#4D515A', fontSize: '17px' }}>{children}</span>
    </Nav.Link>
  );

export default SignupPage;
