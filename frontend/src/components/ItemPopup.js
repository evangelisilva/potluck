import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

const ItemPopup = ({ onClose, userId, eventId, item }) => {
    const handleSignup = () => {
        // Add your signup logic here
        console.log('Signing up...');
        onClose(); // Close the popup after signup
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                    <Container style={{ width: '600px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                        <Row>
                            <Col xs={10}>
                            <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>{item.name}</h2>
                            </Col>
                            <Col xs={2}>
                            <Button
                                variant="primary"
                                onClick={onClose}
                                style={{
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    borderRadius: '30px',
                                    backgroundColor: 'transparent',
                                    borderColor: '#4D515A',
                                    fontFamily: 'Arial',
                                    color: '#4D515A',
                                    marginTop: '10px',
                                    marginBottom: '30px'
                                }}>
                                Close
                            </Button>
                            </Col>
                        </Row>
                   
                        
                        <hr style={{ borderTop: '1px solid #ccc'}} />
                        
                        <Row>
                            <Col>
                                <img src={item.image} style={{maxWidth:"300px"}} />
                            </Col>
                            <Col>
                                <p>{item.notes}</p>
                                {item.allergens && item.allergens.length > 0 && <p><b>Allergens: </b>{item.allergens.join(', ')}</p>}
                                {item.dietary_restrictions && item.dietary_restrictions.length > 0 && <p><b>Dietary Restrictions: </b>{item.dietary_restrictions}</p>}
                            </Col>
                        </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPopup;