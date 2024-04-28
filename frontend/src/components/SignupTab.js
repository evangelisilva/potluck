import React, { useRef, useState, useEffect } from 'react';
import Talk from "talkjs";
import axios from 'axios';
import { Row, Col, Card, Button, Image, Container, CardBody } from 'react-bootstrap';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import ItemSignupPopup from './ItemSignupPopup';
import ItemPopup from './ItemPopup';

const SignupTab = ({ eventDetails, eventGuestData, userData, isConfirmedCancel, openDishSignupPopup }) => {   

    const containerRef = useRef(null);
    const [items, setItems] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [itemPopup, seItemPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [popoverItem, setPopoverItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsResponse = await axios.get(`http://localhost:8000/api/items/${eventDetails._id}`);
            setItems(itemsResponse.data);
            console.log(items);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    function convertToTalkUser(user) {
        return {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            photoUrl: user.image
        };
    } 

    const togglePopover = (item) => {
        setPopoverItem(popoverItem === item ? null : item);
    };

    const handleClick = (guest) => {
        console.log(guest);
        Talk.ready
        .then(async () => {
            const meData = convertToTalkUser(userData);
            const me = new Talk.User(meData);

            const otherData = convertToTalkUser(guest);
            const other = new Talk.User(otherData);
            
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: 'tscOnvIc',
                    me: me
                });
            } 

            const res = await axios.get(`http://localhost:8000/api/events/conversation/${eventDetails._id}/${meData.id}/${otherData.id}`);
            
            const conversationId = res.data.conversationId;
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            const chatbox = window.talkSession.createChatbox(conversation);
            chatbox.mount(containerRef.current);
        })            
        .catch(e => console.error(e));
    }

    const togglePopup = (item) => {
        setSelectedItem(item);
        setShowPopup(!showPopup); // Toggle popup visibility
    }

    const toggleItemPopup = (item) => {
        setSelectedItem(item);
        seItemPopup(!itemPopup); // Toggle popup visibility
    }

    return (
        <div style={{ marginTop: '25px' }}>
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
                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventGuestData.filter(guest => guest.status == 'attending').length}</Card.Subtitle>
                                    </Col>
                                    <Col>
                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.invitedGuests.length}</Card.Subtitle>
                                    </Col>
                                </Row>
                                    <Row style={{color: isConfirmedCancel ? 'gray' : '#E8843C'}}>
                                    <Col>
                                        <Card.Text>Attending</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>Invited</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

               <Card style={{marginBottom: '5px', color: '#4D515A', borderRadius: '10px'}}>
                    <Card.Body>
                        <Row>
                        <Col xs={2}>
                            {eventDetails.organizer.image ? 
                                <Image src={eventDetails.organizer.image} style={{ width: '40px', marginTop: '10px' }} /> :
                                <Image src={process.env.PUBLIC_URL + '/profile.png'} style={{ width: '40px', marginTop: '10px' }} />
                            }
                        </Col>  
                        <Col xs={5} style={{ marginTop: '4%'}}>
                            <Card.Subtitle>{eventDetails.organizer.firstName} {eventDetails.organizer.lastName}</Card.Subtitle>
                            <p style={{fontSize: '12px', color:'#6a6a6a'}}>Organizer (Host)</p>
                         </Col> 
                         {eventDetails.organizer._id !== userData._id && (
                         <Col className="d-flex justify-content-end" xs={5}>
                            <div className="user-action">
                            <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px', marginTop: '13px' }} onClick={() => handleClick(eventDetails.organizer)}>
                                <Image src={process.env.PUBLIC_URL + '/chat.png'} style={{ maxWidth: '25px', paddingRight: '5px' }}/>
                                    Message
                                </Button>
                            </div>
                         </Col> 
                         )}               
                        </Row>
                    </Card.Body>
               </Card>
                {/* Guest list */}
                {eventGuestData
                    // .filter(guest => guest.status !== 'Invited')
                    .filter(guest => guest.status == 'attending' ) // Exclude guests with 'Invited' status
                    .filter(guest => guest.user._id !== userData._id)
                    .filter(guest => guest.user._id !== eventDetails.organizer._id)
                    .map((guest, index) => (
                        <Row key={index}>
                            <Col>
                                <Card style={{marginBottom: '5px', color: '#4D515A', borderRadius: '10px'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={2}>
                                                {guest.user.image ? 
                                                    <Image src={guest.user.image} style={{ width: '40px' }} /> :
                                                    <Image src={process.env.PUBLIC_URL + '/profile.png'} style={{ width: '40px' }} />
                                                }
                                            </Col>
                                             <Col  xs={5} style={{ marginTop: '4%'}}>
                                                <Card.Subtitle>{guest.user.firstName} {guest.user.lastName}</Card.Subtitle>
                                            </Col> 
                                            {/* Button to send message */}
                                            {guest.status === 'attending' && (
                                                <Col className="d-flex justify-content-end" xs={5}>
                                                    <div className="user-action">
                                                    <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }} onClick={() => handleClick(guest.user)}>
                                                        <Image src={process.env.PUBLIC_URL + '/chat.png'} style={{ maxWidth: '25px', paddingRight: '5px' }}/>
                                                        Message
                                                    </Button>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                 </Col>}
                
                
                 <Col xs={7}>
                 {eventDetails.organizer._id === userData._id &&
                    <Row style={{ marginBottom: '5px'}}>
                        <Col xs={9}>
                        </Col>
                        <Col xs={3}>
                        <Button 
                            variant="primary" 
                            style={{borderColor: 'transparent', backgroundColor: "transparent", color: '#E8843C', fontSize: '15px', marginLeft: '20px' }}
                            disabled={isConfirmedCancel}
                            onClick={() => openDishSignupPopup()}
                        >
                            + Add Items
                        </Button>
                        </Col>
                    </Row>}

                {items && 
                <Row>
                    {Object.keys(items).map(category => (
                        <div key={category}>
                        <Row>
                            <Col xs={9}>
                                <div>
                                    <Card.Title style={{ fontSize: '18px', color: isConfirmedCancel ? 'gray' : 'black', marginBottom: '5px' }}>{category}</Card.Title>
                                </div>
                             </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                
                            {items[category].map(item => (
                                // <div key={item._id} onClick={() => toggleItemPopup(item)}>
                                <div key={item._id}>
                                <Card 
                                    style={{ marginBottom: '5px', color: isConfirmedCancel ? 'gray' : '#4D515A', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }} 
                                    data-mdb-popover-init data-mdb-ripple-init data-mdb-content="And here's some amazing content. It's very engaging. Right?"
                                    onClick={() => togglePopup(item)}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={2}>
                                            <Image
                                                src={item.image ? item.image : process.env.PUBLIC_URL + '/dish.png'}
                                                style={{ width: '150px', height: '80px', objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}
                                                fluid
                                            />
                                            </Col>
                                            <Col xs={7}>
                                                <Row>
                                                <Card.Title style={{ fontSize: '15px' }}>{item.name}</Card.Title> 
                                                </Row>
                                                <Row>
                                                <Card.Text style={{ fontSize: '12px', color: 'gray' }}> 
                                                    {item.signups.length} out of {item.slot_count} slots available (each serving {item.quantity} portions)
                                                </Card.Text>
                                                </Row>
                                                <Row style={{marginTop: '10px'}}>
                                                <Container className="d-flex flex-row flex-wrap">
                                                    {Object.values(item.signups.reduce((acc, signup) => {
                                                            if (!acc[signup._id]) {
                                                                acc[signup._id] = { ...signup, count: 1 };
                                                            } else {
                                                                acc[signup._id].count++;
                                                            }
                                                            return acc;
                                                        }, {})).map(signup => (
                                                            <Card.Text key={signup._id} style={{ fontSize: '14px', marginRight: '10px' }}>
                                                                <Image src={signup.image} style={{ width: '30px', paddingRight: '8px' }} fluid />
                                                                {signup.firstName} {signup.lastName} ({signup.count})
                                                            </Card.Text>
                                                        ))}
                                                </Container>
                                                </Row>
                                            </Col>
                                            <Col xs={3}>
                                            {item.slot_count !== item.signups.length && (
                                            <Button 
                                            variant="primary" 
                                            style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginLeft: '37px', marginTop: '19px' }}
                                            onClick={() => togglePopup(item)}>
                                                Signup
                                            </Button>)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                </div>
                            ))}
                            </Col>
                        </Row>
                        <hr style={{ borderTop: '1px solid #000', margin: '20px 0' }} />
                    </div>
                ))}
                </Row>}
            </Col>
                </Row>
                {showPopup && selectedItem && <ItemSignupPopup userId={userData._id} item={selectedItem} eventOrganizer={eventDetails.organizer._id} onClose={() => setShowPopup(false)} />}
                {itemPopup && selectedItem && <ItemPopup item={selectedItem} onClose={() => seItemPopup(false)} />}
                <div style={{position: 'fixed', bottom: 0, height: '500px', right: '2%', width: '350px'}} ref={containerRef}>
                    <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                </div>
        </div>
    );
}

export default SignupTab;