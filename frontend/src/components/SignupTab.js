import React from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const SignupTab = ({ eventDetails, eventDetail, isConfirmedCancel, openDishSignupPopup, dishSignupData }) => {
    return (
        <div style={{ marginTop: '20px' }}>
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
                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetail.guests.filter(guest => guest.status == 'Attending').length}</Card.Subtitle>
                                    </Col>
                                    <Col>
                                        {/* <Card.Subtitle style={{fontSize: '25px'}}>{eventDetails.invitedGuests.filter(guest => guest.status === 'May be').length}</Card.Subtitle> */}
                                        <Card.Subtitle style={{fontSize: '25px'}}>{eventDetail.guests.filter(guest => guest.status == 'May be').length}</Card.Subtitle>
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
                {eventDetail.guests
                    .filter(guest => guest.status !== 'Invited')
                    .filter(guest => guest.status !== 'Not Attending') // Exclude guests with 'Invited' status
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
                    </Col>
                </Row>
        </div>
    );
}

export default SignupTab;