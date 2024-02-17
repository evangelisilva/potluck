import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Dropdown } from 'react-bootstrap';
import SignupNavbar from '../components/SignupNavbar';
import InviteePopup from '../components/InviteePopup'; // Import the InviteePopup component

function EventPage() {
    const [showInviteesPopup, setShowInviteesPopup] = useState(false); // State to control the visibility of the invitee popup

    // Hardcoded event details
    const eventDetails = {
        title: 'Neighborhood Potluck Bash',
        date: 'February 20, 2024',
        startTime: '6:00 PM',
        endTime: '9:00 PM',
        description: 'Join us for a delightful evening of food, friendship, and fun at our Neighborhood Potluck Bash! Bring your favorite dishes to share as we come together to celebrate community and enjoy a diverse array of homemade delights. Don\'t miss out on this opportunity to connect with neighbors and savor delicious flavors from around the world!',
        location: '123 Main Street, Anytown, USA',
        dishes: [
            { name: 'Lasagna', quantityNeeded: 2, quantityTaken: 1, signups: ['Alice', 'Bob'] },
            { name: 'Potato Salad', quantityNeeded: 3, quantityTaken: 2, signups: ['Charlie', 'David', 'Emma'] },
            { name: 'Brownies', quantityNeeded: 2, quantityTaken: 0, signups: [] },
            { name: 'Guacamole', quantityNeeded: 1, quantityTaken: 1, signups: ['Frank'] },
            { name: 'Fruit Salad', quantityNeeded: 2, quantityTaken: 1, signups: ['Grace', 'Henry'] }
        ]
    };

    // Function to handle opening the invitee popup
    const openInviteePopup = () => {
        setShowInviteesPopup(true);
    };

    // Function to handle closing the invitee popup
    const closeInviteePopup = () => {
        setShowInviteesPopup(false);
    };

    return (
        <div>
            <SignupNavbar />
            <div style={{ backgroundColor: '#f8f9fa', fontFamily: 'Inter' }}>
                <Container>
                    <Row>
                        <Col xs={12} md={{ span: 10, offset: 1 }}>
                            <div style={{ backgroundColor: 'white', position: 'relative' }}>
                                <Card style={{ border: 'None', height: '2000px' }}>
                                    <div style={{ maxHeight: '370px', overflow: 'hidden', position: 'relative' }}>
                                        <Image src={process.env.PUBLIC_URL + '/cover.png'} style={{ width: '100%' }} fluid />
                                    </div>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={8}>
                                                <Card.Title>{eventDetails.title}</Card.Title>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-end justify-content-end">
                                                <Button variant="primary" style={{border: 'None', backgroundColor: "#E8843C", fontSize: '15px', marginRight: '5px'}} onClick={openInviteePopup}>
                                                    <Image src={process.env.PUBLIC_URL + '/invite.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                    Invite
                                                </Button>
                                                <Button variant="primary" style={{borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px'}}>
                                                    <Image src={process.env.PUBLIC_URL + '/edit.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                    Edit
                                                </Button>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" style={{borderColor: 'gray', backgroundColor: "transparent", fontSize: '1px', color: 'white', paddingRight: '6px', paddingLeft: '6px'}} >
                                                        <Image src={process.env.PUBLIC_URL + '/more.png'} style={{ maxWidth: '22px'}} fluid />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Duplicate Event</Dropdown.Item>
                                                        <Dropdown.Item>Cancel Event</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Card.Subtitle className="mb-2 text-muted">{eventDetails.date} | {eventDetails.startTime} - {eventDetails.endTime}</Card.Subtitle>
                                        <Card.Text style={{color: '#4D515A'}}><strong>Location:</strong> {eventDetails.location}</Card.Text>
                                        <Card.Text style={{fontSize: '15px', color: '#4D515A'}}>{eventDetails.description}</Card.Text>
                                        {eventDetails.dishes.map((dish, index) => (
                                            <Row key={index}>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title>{dish.name}</Card.Title>
                                                            <Card.Text>Quantity Needed: {dish.quantityNeeded}</Card.Text>
                                                            <Card.Text>Quantity Taken: {dish.quantityTaken}</Card.Text>
                                                            <Card.Text>Signups:</Card.Text>
                                                            <ul>
                                                                {dish.signups.map((name, i) => (
                                                                    <li key={i}>{name}</li>
                                                                ))}
                                                            </ul>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
                               
            {/* Conditionally render the invitee popup */}
            {showInviteesPopup && <InviteePopup onClose={closeInviteePopup} />}
        </div>
    );
}

export default EventPage;
