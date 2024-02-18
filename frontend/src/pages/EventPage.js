import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Dropdown } from 'react-bootstrap';
import SignupNavbar from '../components/SignupNavbar';
import InviteePopup from '../components/InviteePopup';

function EventPage() {
    const [showInviteesPopup, setShowInviteesPopup] = useState(false);

    // Event details
    const eventDetails = {
        title: 'Open Mic Potluck',
        date: 'February 20, 2024',
        startTime: '6:00 PM',
        endTime: '9:00 PM',
        description: 'Get ready for an evening of talent and taste at \'Open Mic Potluck\'! Doors open at 5:30 PM for sign-up. Bring your favorite dish to share and indulge in a delightful culinary experience while enjoying live performances from local artists.',
        location: '123 Main Street, Anytown, USA',
        dishes: [
            { name: 'Lasagna', quantityNeeded: 2, quantityTaken: 1, signups: ['Alice'] },
            { name: 'Potato Salad', quantityNeeded: 3, quantityTaken: 2, signups: ['Charlie', 'David'] },
            { name: 'Brownies', quantityNeeded: 2, quantityTaken: 0, signups: [] },
            { name: 'Guacamole', quantityNeeded: 1, quantityTaken: 1, signups: ['Frank'] },
            { name: 'Fruit Salad', quantityNeeded: 2, quantityTaken: 1, signups: ['Grace', 'Henry'] }
        ],
        guests: [
            { name: 'Alice', email: 'alice@example.com', phone: '555-555-5555', status: 'Attending' },
            { name: 'Bob', email: 'bob@example.com', phone: '555-555-5555', status: 'Invited' },
            { name: 'Charlie', email: 'charlie@example.com', phone: '555-555-5555', status: 'Attending' },
            { name: 'David', email: 'david@example.com', phone: '555-555-5555', status: 'Attending' },
            { name: 'Eve', email: 'eve@example.com', phone: '555-555-5555',  status: 'Not Attending' },
            { name: 'Frank', email: 'frank@example.com', phone: '555-555-5555', status: 'Attending' },
            { name: 'Grace', email: 'grace@example.com', phone: '555-555-5555',status: 'Attending' },
            { name: 'Henry', email: 'henry@example.com', phone: '555-555-5555', status: 'Attending' },
            { name: 'Ivy', email: 'ivy@example.com', phone: '555-555-5555', status: 'May be' },
        ]
    };

    // Function to open invitee popup
    const openInviteePopup = () => {
        setShowInviteesPopup(true);
    };

    // Function to close invitee popup
    const closeInviteePopup = () => {
        setShowInviteesPopup(false);
    };

    return (
        <div>
            {/* Navbar component */}
            <SignupNavbar />
            {/* Main content */}
            <div style={{ backgroundColor: '#f8f9fa', fontFamily: 'Inter' }}>
                <Container>
                    <Row>
                        <Col xs={12} md={{ span: 10, offset: 1 }}>
                            <div style={{ backgroundColor: 'white', position: 'relative' }}>
                                <Card style={{ border: 'none', height: 'auto'}}>
                                    {/* Event cover image */}
                                    <div style={{ maxHeight: '370px', overflow: 'hidden', position: 'relative' }}>
                                        <Image src={process.env.PUBLIC_URL + '/cover.png'} style={{ width: '100%' }} fluid />
                                    </div>
                                    {/* Event details */}
                                    <Card.Body>
                                        <Row>
                                            <Col xs={8}>
                                                <Card.Title style={{ fontSize: '25px', marginBottom: '12px' }}>{eventDetails.title}</Card.Title>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-end justify-content-end">
                                                {/* Buttons for inviting, editing, and more options */}
                                                <Button variant="primary" style={{ border: 'none', backgroundColor: "#E8843C", fontSize: '15px', marginRight: '5px' }} onClick={openInviteePopup}>
                                                    <Image src={process.env.PUBLIC_URL + '/invite.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                    Invite
                                                </Button>
                                                <Button variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }}>
                                                    <Image src={process.env.PUBLIC_URL + '/edit.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                    Edit
                                                </Button>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", fontSize: '1px', color: 'white', paddingRight: '6px', paddingLeft: '6px' }} >
                                                        <Image src={process.env.PUBLIC_URL + '/more.png'} style={{ maxWidth: '22px' }} fluid />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Duplicate Event</Dropdown.Item>
                                                        <Dropdown.Item>Cancel Event</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                        <Card.Subtitle className="mb-2 text-muted">{eventDetails.date} | {eventDetails.startTime} - {eventDetails.endTime}</Card.Subtitle>
                                        <Card.Text style={{ color: '#4D515A' }}><strong>Location:</strong> {eventDetails.location}</Card.Text>
                                        <Card.Text style={{ fontSize: '15px', color: '#4D515A' }}>{eventDetails.description}</Card.Text> 

                                        {/* Horizontal line */}
                                        <hr style={{ borderTop: '1px solid #ccc', margin: '20px 0' }} />

                                        {/* Row for dish signups and guest list */}
                                        <Row>
                                            {/* Column for dish signups */}
                                            <Col style={{ width: '60%' }}>
                                                <Card.Title style={{ fontSize: '18px', color: 'black', marginBottom: '12px' }}>Dish Signups</Card.Title>
                                                {eventDetails.dishes.map((dish, index) => (
                                                    <Row key={index}>
                                                        <Col>
                                                            <Card style={{marginBottom: '5px', color: '#4D515A', borderRadius: '10px', ...(dish.quantityTaken == dish.quantityNeeded && { backgroundColor: '#CDCBCB' })}}>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col>
                                                                            <Card.Subtitle>{dish.name}</Card.Subtitle>
                                                                        </Col>
                                                                        <Col className="d-flex justify-content-end">
                                                                            <Card.Text>{dish.quantityTaken}/{dish.quantityNeeded}</Card.Text>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Card.Text style={{fontSize: '15px'}}>{dish.signups.join(', ')}</Card.Text>
                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                            {/* Column for guest list */}
                                            <Col style={{ width: '40%' }}>
                                                <Row>
                                                    <Col style={{ width: '90%' }}>
                                                        <Card.Title style={{ fontSize: '18px', color: 'black', marginBottom: '12px' }}>Guest List</Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Card style={{marginBottom: '5px', color: '#E8843C', borderRadius: '10px', borderColor: '#E8843C', textAlign: 'center', padding: '10px'}}>
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col>
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.guests.filter(guest => guest.status === 'Attending').length}</Card.Subtitle>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.guests.filter(guest => guest.status === 'May be').length}</Card.Subtitle>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.guests.filter(guest => guest.status === 'Invited').length}</Card.Subtitle>
                                                                    </Col>
                                                                    {/* Exclude guests with 'Invited' status */}
                                                                </Row>
                                                                <Row style={{color: '#E8843C'}}>
                                                                    <Col>
                                                                        <Card.Text>Attending</Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>May be</Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>Not Respnded</Card.Text>
                                                                    </Col>
                                                                    {/* No column for 'Invited' status */}
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                {/* Guest list */}
                                                {eventDetails.guests
                                                    .filter(guest => guest.status !== 'Invited') // Exclude guests with 'Invited' status
                                                    .map((guest, index) => (
                                                        <Row key={index}>
                                                            <Col>
                                                                <Card style={{marginBottom: '5px', color: '#4D515A', borderRadius: '10px'}}>
                                                                    <Card.Body>
                                                                        <Row>
                                                                            <Col>
                                                                                <Card.Subtitle>{guest.name}</Card.Subtitle>
                                                                                <Card.Text style={{fontSize: '13px', color: 'gray'}}>{guest.status}</Card.Text>
                                                                            </Col>
                                                                            {/* Button to send message */}
                                                                            {guest.status === 'Attending' && (
                                                                                <Col className="d-flex justify-content-end">
                                                                                    <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }}>
                                                                                        <Image src={process.env.PUBLIC_URL + '/chat.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                                                        Send Message
                                                                                    </Button>
                                                                                </Col>
                                                                            )}
                                                                        </Row>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    ))}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Invitee popup component */}
            {showInviteesPopup && <InviteePopup onClose={closeInviteePopup} />}
        </div>
    );
}

export default EventPage;
