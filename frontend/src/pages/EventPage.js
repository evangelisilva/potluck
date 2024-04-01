import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Dropdown, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import axios from 'axios';

import InviteePopup from '../components/InviteePopup';
import EditEventPopup from '../components/EditEventPopup';
import CancelEventPopup from '../components/CancelEventPopup';
import DishSignupPopup from '../components/DishSignupPopup';
import SignupNavbar from '../components/SignupNavbar';

function MyComponent() {
    const [showInviteesPopup, setShowInviteesPopup] = useState(false);
    const [showEditEventPopup, setShowEditEventPopup] = useState(false);
    const [showCancelEventPopup, setShowCancelEventPopup] = useState(false);
    const [showDishSignupPopup, setDishSignupPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [isConfirmedCancel, setIsConfirmedCancel] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);
    const [userData, setUserData] = useState(null);
    const [dishSignupData, setDishSignupData] = useState(null);

    const { eventId } = useParams(); 

    useEffect(() => {
        fetchEventDetails();
        fetchSignupsByEventId();
    }, []);

    const fetchSignupsByEventId = async () => {
        try {
            const signupByEventResponse = await axios.get(`http://localhost:8000/api/dishSignups?event=${eventId}`);
            setDishSignupData(signupByEventResponse.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const fetchEventDetails = async () => {
        try {

            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('User not authenticated');
            }
    
            const authResponse = await axios.get('http://localhost:8000/api/auth', {
              headers: {
                Authorization: token,
              },
            });
    
            const userResponse = await axios.get(`http://localhost:8000/api/users/${authResponse.data.userId}`);
            setUserData(userResponse.data);

            const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
            if (response.data.status == 'canceled') {
                setIsConfirmedCancel(true);
            }
            const formattedEventDetails = {
                ...response.data,
                date: formatDate(response.data.date),
                startTime: formatTime(response.data.startTime),
                endTime: formatTime(response.data.endTime),
            };
            setEventDetails(formattedEventDetails);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Function to format time
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        let formattedHours = parseInt(hours) % 12;
        formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle 12:00 PM
        const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
        return `${formattedHours}:${minutes} ${period}`;
    };
    
    // Function to open invitee popup
    const openInviteePopup = () => {
        setShowInviteesPopup(true);
    };

    // Function to close invitee popup
    const closeInviteePopup = () => {
        setShowInviteesPopup(false);
    };

    // Function to open invitee popup
    const openEditEventPopup = () => {
        setShowEditEventPopup(true);
    };

    // Function to close invitee popup
    const closeEditEventPopup = () => {
        setShowEditEventPopup(false);
    };

    // Function to open invitee popup
    const openCancelEventPopup = () => {
        setShowCancelEventPopup(true);
    };

    // Function to close invitee popup
    const closeCancelEventPopup = () => {
        setShowCancelEventPopup(false);
    };

    const openDishSignupPopup = (categoryName) => {
        setSelectedCategory(categoryName);
        setDishSignupPopup(true);
    };

    const closeDishSignupPopup = () => {
        setDishSignupPopup(false);
    };

    // Inside MyComponent function
    const handleConfirmCancel = async () => {
        setIsConfirmedCancel(true); // Set confirmation status to true
        try {
            await handleCancelInvite(eventId); // Cancel the event
        } catch (error) {
            console.error('Error canceling event:', error);
            // Handle error
        }
    };

    // Function to cancel an event
    const handleCancelInvite = async (eventId) => {
        try {
            await axios.put(`http://localhost:8000/api/events/${eventId}`, { status: 'canceled' });
            // Event cancellation successful
            console.log('Event canceled successfully');
        } catch (error) {
            console.error('Error canceling event:', error);
            // Handle error
        }
    };

    const handleInviteSuccess = async (emailArray) => {
        try {
            // Make PUT request to update invitedGuests array
            await axios.put(`http://localhost:8000/api/events/${eventId}`, {
                invitedGuests: [...eventDetails.invitedGuests, ...emailArray]
            });
            console.log("Invitation sent successfully with email array:", emailArray);
            // Refresh event details after successful update
            fetchEventDetails();
        } catch (error) {
            console.error('Error updating invitedGuests:', error);
        }
    };

    const handleEditEvent = async (formData) => {
        const editedEventData = {};
        if (formData) { 
    
            // Check and set title if not empty
            if (formData.title) {
                editedEventData.title = formData.title;
            }
    
            // Check and set description if not empty
            if (formData.description) {
                editedEventData.description = formData.description;
            }
    
            // Check and set date if not empty
            if (formData.date) {
                editedEventData.date = formData.date;
            }
    
            // Check and set startTime if not empty
            if (formData.startTime) {
                editedEventData.startTime = formData.startTime;
            }
    
            // Check and set endTime if not empty
            if (formData.endTime) {
                editedEventData.endTime = formData.endTime;
            }

            // Check and set streetAdress1 if not empty
            if (formData.streetAdress1) {
                editedEventData.location.streetAdress1 = formData.streetAdress1;
            }

            // Check and set streetAdress2 if not empty
            if (formData.streetAdress2) {
                editedEventData.location.streetAdress2 = formData.streetAdress2;
            }

            // Check and set city if not empty
            if (formData.city) {
                editedEventData.location.city = formData.city;
            }

            // Check and set state if not empty
            if (formData.state) {
                editedEventData.location.state = formData.state;
            }

            // Check and set zipCode if not empty
            if (formData.zipCode) {
                editedEventData.location.zipCode = formData.zipCode;
            }
        }

        try {
            await axios.put(`http://localhost:8000/api/events/${eventId}`, editedEventData);
            console.log('Event modified successfully');
            fetchEventDetails();
        } catch (error) {
            console.error('Error modifying event:', error);
        }
    };

    const handleDishSignup = async (signupData) => {

        const dishSignupData = {
            user: userData._id,
            event: eventId,
            dish: signupData.dishId,
            dishCategory: signupData.categoryName
        }

        try {
            await axios.post(`http://localhost:8000/api/dishSignups/`, dishSignupData);
            console.log('Dish signup successful');

            await axios.put(`http://localhost:8000/api/events/${eventId}/update-taken/${signupData.categoryName}`);
            fetchEventDetails();

            window.location.reload();
        } catch (error) {
            console.error('Error signing up for a dish: ', error);
        }
    }

    return (
        <div>
            <SignupNavbar userData={userData}/>
            <div style={{ backgroundColor: '#f8f9fa', fontFamily: 'Arial' }}>
                <Container>
                        <Row>
                            <Col xs={12} md={{ span: 10, offset: 1 }}>
                                <div style={{ backgroundColor: 'white', position: 'relative' }}>
                                    <Card style={{ border: 'none', height: 'auto'}}>
                                        {/* Event cover image */}
                                        <div style={{ maxHeight: '370px', overflow: 'hidden', position: 'relative' }}>
                                            <Image src={process.env.PUBLIC_URL + '/cover.png'} style={{ width: '100%', filter: isConfirmedCancel ? 'grayscale(100%)' : 'none' }} fluid />
                                        </div>

                                        {/* Event details */}
                                        <Card.Body>
                                            <Row>
                                                <Col xs={8}>
                                                    {eventDetails && <Card.Title style={{ fontSize: '25px', marginBottom: '12px', color: isConfirmedCancel? 'gray': 'none' }}>{eventDetails.title}</Card.Title>}
                                                </Col>
                                                {/* <Col xs={8}> */}
                                                    {/* Display cancellation status */}
                                                    {/* {isConfirmedCancel ? <h3 style={{ color: 'red' }}>Cancelled</h3> : null} */}
                                                    {/* Rest of your code */}
                                                {/* </Col> */}
                                                <Col xs={4} className="d-flex align-items-end justify-content-end">
                                                    {/* Buttons for inviting, editing, and more options */}
                                                    <Button variant="primary" style={{ border: 'none', backgroundColor: isConfirmedCancel ? 'gray' : '#E8843C', fontSize: '15px', marginRight: '5px' }} onClick={openInviteePopup} disabled={isConfirmedCancel}>
                                                        <Image src={process.env.PUBLIC_URL + '/invite.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                        Invite
                                                    </Button>
                                                    <Button variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }} onClick={openEditEventPopup} disabled={isConfirmedCancel}>
                                                        <Image src={process.env.PUBLIC_URL + '/edit.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                        Edit
                                                    </Button>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", fontSize: '1px', color: 'white', paddingRight: '6px', paddingLeft: '6px' }} disabled={isConfirmedCancel}>
                                                            <Image src={process.env.PUBLIC_URL + '/more.png'} style={{ maxWidth: '22px' }} fluid />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>Duplicate Event</Dropdown.Item>
                                                            <Dropdown.Item onClick={openCancelEventPopup}>Cancel Event</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                            </Row>
                                            {eventDetails && <Card.Subtitle className="mb-2 text-muted">{eventDetails.date} | {eventDetails.startTime} - {eventDetails.endTime}</Card.Subtitle>}
                                            {eventDetails && <Card.Text style={{ color: isConfirmedCancel? 'gray': '#4D515A' }}><strong>Location: </strong> 
                                                {eventDetails.location}
                                            </Card.Text>}
                                            {eventDetails && <Card.Text style={{ fontSize: '15px', color: isConfirmedCancel ? 'gray': '#4D515A' }}>{eventDetails.description}</Card.Text>}
                                        </Card.Body>   
                                        {/* Horizontal line */}
                                        <hr style={{ borderTop: '1px solid #ccc', margin: '20px 0' }} />

                                        {/* Row for dish signups and guest list */}
                                        <Row style={{marginRight: '10px', marginLeft: '10px'}}>
                                            {eventDetails &&  <Col xs={5}>
                                                <Row>
                                                    <Col style={{ width: '90%' }}>
                                                        <Card.Title style={{ fontSize: '18px', color: isConfirmedCancel? 'gray': 'black', marginBottom: '12px' }}>Location</Card.Title>
                                                    </Col>
                                                </Row>
                                                    
                                                <Row>
                                                    <LoadScript googleMapsApiKey='AIzaSyCtbRo01fTbzufcODkYOvggZVMj9LnBFyE'>
                                                        <GoogleMap mapContainerStyle={{ height: '300px', width: '95%', borderRadius: '20px', marginLeft: '8px'}} zoom={15} center={eventDetails.coordinates}>
                                                            {eventDetails && <MarkerF position={eventDetails.coordinates} />}
                                                        </GoogleMap>
                                                    </LoadScript>

                                                </Row> <br />

                                                <Row>
                                                    <Col style={{ width: '90%' }}>
                                                        <Card.Title style={{ fontSize: '18px', color: isConfirmedCancel? 'gray': 'black', marginBottom: '12px' }}>Guest List</Card.Title>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <Card style={{marginBottom: '5px', color: isConfirmedCancel ? 'gray' : '#E8843C', borderRadius: '10px', borderColor: isConfirmedCancel ? 'gray' : '#E8843C', textAlign: 'center', padding: '10px'}}>
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col>
                                                                        {/* <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.invitedGuests.filter(guest => guest.status === 'Attending').length}</Card.Subtitle> */}
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>0</Card.Subtitle>
                                                                    </Col>
                                                                    <Col>
                                                                        {/* <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.invitedGuests.filter(guest => guest.status === 'May be').length}</Card.Subtitle> */}
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>0</Card.Subtitle>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.invitedGuests.length}</Card.Subtitle>
                                                                    </Col>
                                                                    {/* Exclude guests with 'Invited' status */}
                                                                </Row>
                                                                <Row style={{color: isConfirmedCancel ? 'gray' : '#E8843C'}}>
                                                                    <Col>
                                                                        <Card.Text>Attending</Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>May be</Card.Text>
                                                                    </Col>
                                                                    <Col>
                                                                        <Card.Text>Invited</Card.Text>
                                                                    </Col>
                                                                    {/* No column for 'Invited' status */}
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>

                                                
                                                {/* Guest list */}
                                                {/* {eventDetails.invitedGuests
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
                                                                            </Col> */}
                                                                            {/* Button to send message */}
                                                                            {/* {guest.status === 'Attending' && (
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
                                                    ))} */}
                                                </Col>}

                                                <Col xs={7}>
                                                {eventDetails && eventDetails.dishCategory.map((category, index) => (
                                                    
                                                    <div key={index}>
                                                        <Row>
                                                            <Col xs={9}>
                                                                <Card.Title style={{ fontSize: '18px', color: isConfirmedCancel ? 'gray' : 'black', marginBottom: '2px' }}>{category.name}</Card.Title>
                                                                
                                                                <Card.Text style={{ fontSize: '14px', color: 'gray', marginBottom: '15px' }}>
                                                                    {category.taken} out of {category.quantity} slots available
                                                                </Card.Text>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <Button
                                                                    style={{ 
                                                                        fontFamily: 'Arial',
                                                                        color: '#4D515A', 
                                                                        backgroundColor: 'transparent',
                                                                        border: '1px solid #4D515A',
                                                                        fontSize: '15px',
                                                                        paddingLeft: '19px',
                                                                        paddingRight: '19px',
                                                                        marginBottom: '5px',
                                                                        width: '100%',
                                                                        borderRadius: '20px'
                                                                    }}
                                                                    disabled={isConfirmedCancel}
                                                                    onClick={() => openDishSignupPopup(category.name)}>Sign up</Button>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                        {dishSignupData && dishSignupData.signups.find(signup => Object.keys(signup)[0] === category.name)?.[category.name].map((signup, signupIndex) => (
                                                            <Col key={signupIndex} xs={12}>
                                                            <Card style={{ marginBottom: '5px', color: isConfirmedCancel ? 'gray' : '#4D515A', borderRadius: '10px', marginBottom: '10px' }}>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col xs={2}>
                                                                        <Image src={process.env.PUBLIC_URL + '/dish.png'} style={{ maxWidth: '85%', marginLeft: '10px' }} fluid />
                                                                        </Col>
                                                                        <Col xs={10}>
                                                                            <Card.Title style={{ fontSize: '15px' }}>{signup.dishName}</Card.Title>  
                                                                            {signup.description && <Card.Text style={{ fontSize: '12px' }}>{signup.description}</Card.Text>}  
                                                                            <Card.Text style={{ fontSize: '12px', color: 'gray' }}>
                                                                                Allergens: { signup.allergens && signup.allergens.length > 0 ? signup.allergens.join(', ') : 'None' } | 
                                                                                Dietary Restrictions: { signup.dietaryRestrictions && signup.dietaryRestrictions.length > 0 ? signup.dietaryRestrictions.join(', ') : 'None' }
                                                                            </Card.Text>
                                                                            <Card.Text style={{ fontSize: '14px' }}>
                                                                                <Image src={process.env.PUBLIC_URL + '/profile.png'} style={{ width: '30px', paddingRight: '8px' }} fluid />
                                                                                {signup.userFirstName} {signup.userLastName}
                                                                            </Card.Text>
                                                                        </Col>

                                                                    </Row>
                                                                </Card.Body>
                                                            </Card>
                                                            </Col>
                                                        ))}
                                                        </Row> 
                                                         <hr style={{ borderTop: '1px solid #000', margin: '20px 0' }} />
                                                    </div>
                                                ))}
                                                </Col>
                                            </Row>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                </Container>
            </div>
            {/* Invitee popup component */}
            {showInviteesPopup && <InviteePopup onClose={closeInviteePopup} onSuccess={handleInviteSuccess} eventId={eventId} />}
            {showEditEventPopup && <EditEventPopup onClose={closeEditEventPopup} onSave={handleEditEvent} />}
            {showCancelEventPopup && <CancelEventPopup onClose={closeCancelEventPopup} onConfirm={handleConfirmCancel} />}
            {showDishSignupPopup && <DishSignupPopup onClose={closeDishSignupPopup} onSignup={handleDishSignup} userId={userData._id} categoryName={selectedCategory} eventId={eventId}/>}
        </div>
    );
}

export default MyComponent;
