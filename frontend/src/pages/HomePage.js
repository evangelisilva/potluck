import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from '../components/SignupNavbar';

// Author: Evangeli Silva 
// Description: This component represents the homepage of the application.
// It includes a header, description, and a button to navigate to the create event page.
function HomePage() {
    // Initialize the navigate function from useNavigate hook
    const navigate = useNavigate();

    return (
        <>
            {/* Include the SignupNavbar component */}
            <SignupNavbar />

            {/* Main content */}
            <Container>
                <Row>
                    {/* Left column */}
                    <Col md={4} style={{ fontFamily: 'Inter', paddingLeft: '80px' }}>
                        {/* Heading */}
                        <h1 style={{ paddingTop: '190px', color: '#4D515A', fontSize: '55px', lineHeight: '1.3' }}>Flavor-filled<br />fun awaits!</h1>
                        {/* Description */}
                        <p style={{ paddingTop: '10px', paddingBottom: '10px', color: '#4D515A', fontSize: '22px', lineHeight: '1.4' }}>
                            Say goodbye to stress, hello to <br />
                            shared memories. Join us for <br />
                            community, friendship, and good <br />
                            food.
                        </p>
                        {/* Get Started button */}
                        <Button 
                            onClick={() => navigate('/events/new')} // Navigate to '/events/new' on button click
                            style={{ 
                                paddingLeft: '17px', 
                                paddingRight: '18px', 
                                paddingTop: '8px', 
                                paddingBottom: '8px', 
                                borderRadius: '30px', 
                                backgroundColor: '#E8843C', 
                                borderColor: '#E8843C', 
                                fontSize: '19px' 
                            }}
                        >
                            Get Started
                        </Button>
                    </Col>
                    {/* Right column */}
                    <Col md={8}>
                        {/* Main image */}
                        <Image src={process.env.PUBLIC_URL + 'img_main.jpg'} style={{ paddingTop: '70px', paddingRight: '80px' }} fluid />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;
