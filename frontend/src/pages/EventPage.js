import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Dropdown, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import InviteePopup from '../components/InviteePopup';
import EditEventPopup from '../components/EditEventPopup';
import CancelEventPopup from '../components/CancelEventPopup';
import DuplicateEventPopup from '../components/DuplicateEventPopup';
import DishSignupPopup from '../components/DishSignupPopup';
import SignupNavbar from '../components/SignupNavbar';
import SignupTab from '../components/SignupTab';
import RecapTab from '../components/RecapTab';

function MyComponent() {
    const navigate = useNavigate();

    const [showInviteesPopup, setShowInviteesPopup] = useState(false);
    const [showEditEventPopup, setShowEditEventPopup] = useState(false);
    const [showCancelEventPopup, setShowCancelEventPopup] = useState(false);
    const [showDuplicateEventPopup, setShowDuplicateEventPopup] = useState(false);
    const [showDishSignupPopup, setDishSignupPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [isConfirmedCancel, setIsConfirmedCancel] = useState(false);
    const [IsConfirmedDuplicate, setIsConfirmedDuplicate] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);
    const [userData, setUserData] = useState(null);
    const [dishSignupData, setDishSignupData] = useState(null);

    const { eventId } = useParams(); 

    useEffect(() => {
        fetchEventDetails();
        fetchSignupsByEventId();
        
    }, []);

    const eventDetail = {
        guests: [
            { name: 'Alice', status: 'Attending' },
            { name: 'Bob', status: 'Invited' },
            { name: 'Charlie', status: 'Attending' },
            { name: 'David', status: 'Attending' },
            { name: 'Eve', status: 'Not Attending' },
            { name: 'Frank', status: 'Attending' },
            { name: 'Grace', status: 'Attending' },
            { name: 'Henry', status: 'Attending' },
            { name: 'Ivy', status: 'May be' },
        ]
    };

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
                navigate('/signin'); // Redirect to signin page if token is not available
                return;
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

            console.log(formattedEventDetails)
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

    const openDuplicateEventPopup = () => {
        setShowDuplicateEventPopup(true);
    };

    // Function to close invitee popup
    const closeDuplicateEventPopup = () => {
        setShowDuplicateEventPopup(false);
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

    const handleConfirmDuplicate = async () => {
        setIsConfirmedDuplicate(true); // Set confirmation status to true
        try {
            await handleDuplicateInvite(eventId); // Duplicate the event
        } catch (error) {
            console.error('Error duplicating event:', error);
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

    const handleDuplicateInvite = async (eventId) => {
        try {
            await axios.put(`http://localhost:8000/api/events/${eventId}`, { visibility: eventDetails.visibility == "public" ? "private" : "public" });
            // Event duplication successful
            console.log('Event duplicated successfully');
        } catch (error) {
            console.error('Error duplicating event:', error);
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

        console.log(dishSignupData)

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
                                                            <Dropdown.Item onClick={openDuplicateEventPopup}>Duplicate Event</Dropdown.Item>
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

                                        <Tabs defaultActiveKey="about" id="eventtabs">
                                            <Tab eventKey="about" title={<span style={{ color: 'black' }}>Signup</span>}>
                                                <SignupTab 
                                                    eventDetails={eventDetails}
                                                    eventDetail={eventDetail}
                                                    isConfirmedCancel={isConfirmedCancel} 
                                                    openDishSignupPopup={openDishSignupPopup}
                                                    dishSignupData={dishSignupData} />
                                            </Tab>
                                            <Tab eventKey="profile" title={<span style={{ color: 'black' }}>Recap</span>}>
                                                <RecapTab />
                                            </Tab>
                                        </Tabs>
                                        
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
            {showDuplicateEventPopup && <DuplicateEventPopup onClose={closeDuplicateEventPopup} onConfirm={handleConfirmDuplicate} visibility={eventDetails.visibility == "public" ? "private" : "public"} />}
            {showDishSignupPopup && <DishSignupPopup onClose={closeDishSignupPopup} onSignup={handleDishSignup} userId={userData._id} categoryName={selectedCategory} eventId={eventId}/>}
        </div>
    );
}

export default MyComponent;
