import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Image, Dropdown, Tab, Tabs } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Talk from "talkjs";
import axios from 'axios';

import InviteePopup from '../components/InviteePopup';
import EditEventPopup from '../components/EditEventPopup';
import CancelEventPopup from '../components/CancelEventPopup';
import DishSignupPopup from '../components/DishSignupPopup';
import SignupNavbar from '../components/SignupNavbar';
import SignupTab from '../components/SignupTab';
import RecapTab from '../components/RecapTab';
import DishRecognizePopup from '../components/DishRecognizePopup';

let keyTab = "about";

function MyComponent({tab}) {
    ////keyTab = "about";

    const navigate = useNavigate();
    const containerRef = useRef(null);

    const [activeKey, setActiveKey] = useState('signup');
    const [showInviteesPopup, setShowInviteesPopup] = useState(false);
    const [showEditEventPopup, setShowEditEventPopup] = useState(false);
    const [showCancelEventPopup, setShowCancelEventPopup] = useState(false);
    const [showDishSignupPopup, setDishSignupPopup] = useState(false);
    const [showDishRecognizePopup, setShowDishRecognizePopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [isConfirmedCancel, setIsConfirmedCancel] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);
    const [userData, setUserData] = useState(null);
    const [eventGuestData, setEventGuestData] = useState(null);
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
            setEventDetails(formattedEventDetails);

            

            const eventGuestsResponse = await axios.get(`http://localhost:8000/api/events/chat/${eventId}`);
            setEventGuestData(eventGuestsResponse.data);
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

    const openDishRecognizePopup = () => {
        setShowDishRecognizePopup(true);
    };

    const closeDishRecognizePopup = () => {
        setShowDishRecognizePopup(false);
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

    const changeKeyTab = (eventKey) => {
        keyTab = eventKey;
    }

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
            await axios.put(`http://localhost:8000/api/events/${eventId}`, { status: 'cancelled' });
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

    const handleDishSignup = () => {
        window.location.reload();
    }

    const handleTabSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };

    function convertArrayToTalkUsers(users) {
        return users
        .filter(user => user.status == 'attending')
        .filter(user => user.user._id !== userData._id)
        .map(user => (
            new Talk.User({
                id: user.user._id,
                name: user.user.firstName + " " + user.user.lastName,
                email: user.user.email,
                photoUrl: user.user.image
        })));
    }   
    
    function convertArrayToTalkUser(user) {
        return {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            photoUrl: user.image
        };
    } 

    const handleClick = () => {
        Talk.ready
        .then(() => {
            const me = new Talk.User(convertArrayToTalkUser(userData));
            const participants = convertArrayToTalkUsers(eventGuestData);

            /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: 'tscOnvIc',
                    me: me
                });
            } 
            
            const conversationId = eventId + "_";
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            conversation.setParticipant(me);
            participants.forEach(participant => conversation.setParticipant(participant));

            const chatbox = window.talkSession.createChatbox(conversation);
            chatbox.mount(containerRef.current);
        })            
        .catch(e => console.error(e));
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
                                                    { eventDetails && eventDetails.organizer === userData._id && 
                                                    <Button variant="primary" style={{ border: 'none', backgroundColor: isConfirmedCancel ? 'gray' : '#E8843C', fontSize: '15px', marginRight: '5px' }} onClick={openInviteePopup} disabled={isConfirmedCancel}>
                                                        <Image src={process.env.PUBLIC_URL + '/invite.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                        Invite
                                                    </Button> }
                                                    { eventDetails && eventDetails.organizer === userData._id && 
                                                     <Button variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }} onClick={openEditEventPopup} disabled={isConfirmedCancel}>
                                                        <Image src={process.env.PUBLIC_URL + '/edit.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                        Edit
                                                    </Button>  }  
                                                    <div className="user-action">
                                                    <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }} onClick={() => handleClick()}>
                                                        <Image src={process.env.PUBLIC_URL + '/chat.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} fluid />
                                                        Message
                                                    </Button>
                                                    </div>
                                                    { eventDetails && eventDetails.organizer === userData._id ?
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", fontSize: '1px', color: 'white', paddingRight: '6px', paddingLeft: '6px' }} disabled={isConfirmedCancel}>
                                                            <Image src={process.env.PUBLIC_URL + '/more.png'} style={{ maxWidth: '22px' }} fluid />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={openCancelEventPopup}>Cancel Event</Dropdown.Item>
                                                            <Dropdown.Item>Duplicate Event</Dropdown.Item>
                                                            <Dropdown.Item onClick={openDishRecognizePopup}>What's the Dish?</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown> : 
                                                    <div>
                                                    <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }}  onClick={openDishRecognizePopup}>
                                                        What's the Dish?
                                                    </Button>
                                                    </div>}
                                                </Col>
                                            </Row>
                                            {eventDetails && <Card.Subtitle className="mb-2 text-muted">{eventDetails.date} | {eventDetails.startTime} - {eventDetails.endTime}</Card.Subtitle>}
                                            {eventDetails && <Card.Text style={{ color: isConfirmedCancel? 'gray': '#4D515A' }}><strong>Location: </strong> 
                                                {eventDetails.location}
                                            </Card.Text>}
                                            {eventDetails && <Card.Text style={{ fontSize: '15px', color: isConfirmedCancel ? 'gray': '#4D515A' }}>{eventDetails.description}</Card.Text>}
                                        </Card.Body>   

                                        <Tabs id="eventtabs" activeKey={activeKey} onSelect={handleTabSelect} style={{ marginTop: '10px'}}>
                                            <Tab eventKey="signup" title={<span style={{ color: activeKey === 'signup' ? 'black' : 'gray' }}>Signup</span>}>
                                                {eventGuestData && <SignupTab 
                                                    eventDetails={eventDetails}
                                                    eventGuestData={eventGuestData}
                                                    userData={userData}
                                                    isConfirmedCancel={isConfirmedCancel} 
                                                    openDishSignupPopup={openDishSignupPopup}
                                                    dishSignupData={dishSignupData} />}
                                            </Tab>

                                            <Tab eventKey="recap" title={<span style={{ color: activeKey === 'recap' ? 'black' : 'gray' }}>Recap</span>}>
                                                {userData === null ? <div></div> : <RecapTab userId={userData._id} eventId={eventId}/>}
                                            </Tab>
                                        </Tabs>
                                        
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                </Container>
                <div style={{position: 'fixed', bottom: 0, height: '500px', right: '2%', width: '350px'}} ref={containerRef}>
                    <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                </div>
            </div>
            {/* Invitee popup component */}
            {showInviteesPopup && <InviteePopup onClose={closeInviteePopup} onSuccess={handleInviteSuccess} eventId={eventId} />}
            {showEditEventPopup && <EditEventPopup onClose={closeEditEventPopup} onSave={handleEditEvent} />}
            {showCancelEventPopup && <CancelEventPopup onClose={closeCancelEventPopup} onConfirm={handleConfirmCancel} />}
            {showDishSignupPopup && <DishSignupPopup onClose={closeDishSignupPopup} userId={userData._id} eventId={eventId}/>}
            {showDishRecognizePopup && <DishRecognizePopup onClose={closeDishRecognizePopup} eventId={eventId}/>}
        </div>

    );
}

export default MyComponent;