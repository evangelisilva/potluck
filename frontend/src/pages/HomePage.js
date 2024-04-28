import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from '../components/SignupNavbar';
 
// This component represents the homepage of the application.
// It includes a header, description, and a button to navigate to the create event page.
function HomePage() {
    const [userData, setUserData] = useState(null);
    // Initialize the navigate function from useNavigate hook
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('User not authenticated');
            }
    
            const authResponse = await axios.get('http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/auth', {
              headers: {
                Authorization: token,
              },
            });
    
            const userResponse = await axios.get(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/users/${authResponse.data.userId}`);
            setUserData(userResponse.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUserData();
      }, []);

    return (
        <>
            {/* Include the SignupNavbar component */}
            {/* <SignupNavbar /> */}

            {/* Main content */}
            <SignupNavbar userData={userData}/>
            <Container>
                <Row className="align-items-center">
                    {/* Left column */}
                    <Col md={4} style={{ fontFamily: 'Arial', paddingLeft: '5rem' }}>
                        {/* Heading */}
                        <h1 className="mb-4 mb-md-5" style={{ color: '#4D515A', fontSize: '3.4375rem', lineHeight: '1.3' }}>Flavor-filled<br />fun awaits!</h1>
                        {/* Description */}
                        <p className="mb-4 mb-md-5" style={{ color: '#4D515A', fontSize: '1.3125rem', lineHeight: '1.4' }}>
                            Say goodbye to stress, hello to <br />
                            shared memories. Join us for <br />
                            community, friendship, and good <br />
                            food.
                        </p>
                        {/* Get Started button */}
                        <Button 
                            onClick={() => {
                                if (!userData) {
                                    navigate('/signin'); 
                                } else {
                                    navigate('/events/new');
                                }
                            }}
                            className="mb-4 mb-md-0" 
                            style={{ 
                                paddingLeft: '1.0625rem', 
                                paddingRight: '1.125rem', 
                                paddingTop: '0.5rem', 
                                paddingBottom: '0.5rem', 
                                borderRadius: '1.875rem', 
                                backgroundColor: '#E8843C', 
                                borderColor: '#E8843C', 
                                fontSize: '1.1875rem' 
                            }}
                        >
                            Get Started
                        </Button>
                    </Col>
                    {/* Right column */}
                    <Col md={8} className="text-center">
                        {/* Main image */}
                        <Image src={process.env.PUBLIC_URL + '/img_main.jpg'} className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
