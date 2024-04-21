import React, { useRef, useState, useEffect } from 'react';
import Talk from "talkjs";
import axios from 'axios';
import { Row, Col, Card, Button, Image, Container } from 'react-bootstrap';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const SignupTab = ({ eventDetails, eventGuestData, userData, isConfirmedCancel, openDishSignupPopup, dishSignupData }) => {   

    const containerRef = useRef(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const itemsResponse = await axios.get(` http://localhost:8000/api/items/${eventDetails._id}`);
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

                {/* Guest list */}
                {eventGuestData
                    // .filter(guest => guest.status !== 'Invited')
                    .filter(guest => guest.status == 'attending' ) // Exclude guests with 'Invited' status
                    .filter(guest => guest.user._id !== userData._id)
                    .map((guest, index) => (
                        <Row key={index}>
                            <Col>
                                <Card style={{marginBottom: '5px', color: '#4D515A', borderRadius: '10px'}}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={2}>
                                                <Image src={guest.user.image} style={{ width: '40px' }} />
                                            </Col>
                                             <Col  xs={5} style={{ marginTop: '4%'}}>
                                                <Card.Subtitle>{guest.user.firstName} {guest.user.lastName}</Card.Subtitle>
                                            </Col> 
                                            {/* Button to send message */}
                                            {guest.status === 'attending' && (
                                                <Col className="d-flex justify-content-end" xs={5}>
                                                    <div className="user-action">
                                                    <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }}>
                                                        <Image src={process.env.PUBLIC_URL + '/chat.png'} style={{ maxWidth: '25px', paddingRight: '5px' }} onClick={() => handleClick(guest.user)}/>
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
                    <Row style={{ marginBottom: '5px'}}>
                        <Col xs={9}>
                        </Col>
                        <Col xs={3}>
                        <Button variant="primary" style={{borderColor: '#E8843C', backgroundColor: "#E8843C", color: 'white', fontSize: '15px', marginLeft: '20px' }}>
                            + Add Items
                        </Button>
                        </Col>
                        {/* Your content */}
                    
                    </Row>

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
                                <Card style={{ marginBottom: '5px', color: isConfirmedCancel ? 'gray' : '#4D515A', borderRadius: '10px', marginBottom: '10px' }}>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={2}>
                                            <Image
                                                src={item.image ? item.image : process.env.PUBLIC_URL + '/dish.png'}
                                                style={{ width: '150px', height: '75px', objectFit: 'cover', alignItems: 'center', justifyContent: 'center' }}
                                                fluid
                                            />
                                            </Col>
                                            <Col xs={8}>
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
                                                    {item.signups.map((signup) => (
                                                        <Card.Text key={signup._id} style={{ fontSize: '14px', marginRight: '10px' }}>
                                                            <Image src={signup.image} style={{ width: '30px', paddingRight: '8px' }} fluid />
                                                            {signup.firstName} {signup.lastName}
                                                        </Card.Text>
                                                    ))}
                                                </Container>
                                                </Row>
                                            </Col>
                                            <Col xs={2}>
                                            {item.slot_count !== item.signups.length && (
                                            <Button variant="primary" style={{borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px', marginTop: '10px' }}>
                                                Signup
                                            </Button>)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                            </Col>
                        </Row>
                        <hr style={{ borderTop: '1px solid #000', margin: '20px 0' }} />
                    </div>
                ))}
                </Row>}
            </Col>


                {/* <Col xs={7}>
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
                                        {category.quantity !== category.taken && (
                                        <Button
                                            style={{ 
                                                fontFamily: 'Arial',
                                                color: '#4D515A', 
                                                backgroundColor: 'transparent',
                                                order: '1px solid #4D515A',
                                                fontSize: '15px',
                                                paddingLeft: '19px',
                                                paddingRight: '19px',
                                                marginBottom: '5px',
                                                width: '100%',
                                                borderRadius: '20px'
                                            }}
                                            disabled={isConfirmedCancel}
                                            onClick={() => openDishSignupPopup(category.name)}>Sign up</Button>)}
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
                    </Col> */}
                </Row>
                <div style={{position: 'fixed', bottom: 0, height: '500px', right: '2%', width: '350px'}} ref={containerRef}>
                    <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                </div>
        </div>
    );
}

export default SignupTab;