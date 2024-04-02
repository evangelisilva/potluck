import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../styles/modal.css';

// CancelEventPopup component takes onClose function as props
const CancelEventPopup = ({ onClose, onConfirm }) => {

    // const [cancellationReason, setCancellationReason] = useState('');

    const handleConfirm = () => {
        onClose(); // Close the popup
        // onConfirm(cancellationReason); // Trigger the confirmation in MyComponent
        onConfirm();
    };

    return (
        // Modal overlay
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        {/* Container for the content */}
                        <Container style={{ width: '525px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            {/* Title */}
                            {/* <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Cancel or Delete Event</h2> */}
                            <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>Cancel Event</h2>
                            {/* Divider */}
                            <hr style={{ borderTop: '1px solid #ccc'}} />

                            {/* Form */}
                            <Form>
                                <Form.Group>
                                    {/* Cancel Event */}
                                    <Row>
                                        {/* <Col> */}
                                            {/* <Form.Label style={{ width: '450px' }}>Cancel Event</Form.Label> */}
                                            {/* Explanation */}
                                            <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                               If you cancel your event, guests will be notified. You'll be able to access the event page but won't be able to edit the event. If you wish to proceed with canceling the event, please confirm.
                                            </Form.Text>
                                        {/* </Col>
                                        Radio button
                                        <Col>
                                            <Form.Check  type="radio" name="Radios" id="Radio2" />
                                        </Col> */}
                                    </Row><br/>
                                    {/* <Row>
                                        <Form.Label style={{ color: '#4D515A', fontSize: '14px', marginTop: '10px' }}>Share the reason</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            value={cancellationReason}
                                            onChange={(e) => setCancellationReason(e.target.value)}
                                        />
                                    </Row> */}

                                    {/* Delete Event */}
                                    {/* <Row>
                                        <Col>
                                            <Form.Label style={{ width: '450px' }}>Delete Event</Form.Label> */}
                                            {/* Explanation */}
                                            {/* <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                               If you delete your event, you won't be able to access it again. If you'll want to come back to it, you can cancel your event instead.
                                            </Form.Text>
                                        </Col> */}
                                        {/* Radio button */}
                                        {/* <Col>
                                        <Form.Check  type="radio" name="Radios" id="Radio2" />
                                        </Col>
                                    </Row> */}
                                    
                                </Form.Group>
                        </Form>
                        </Container>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            {/* Close button */}
                            <Button
                                variant="primary"
                                onClick={onClose}
                                style={{
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    borderRadius: '30px',
                                    backgroundColor: 'transparent',
                                    border: 'None',
                                    fontFamily: 'Arial',
                                    marginRight: '10px',
                                    color: ' #4D515A',
                                    marginBottom: '50px'
                                }}>
                                Close
                            </Button>
                            {/* Confirm button */}
                            <Button
                                variant="primary"
                                onClick={handleConfirm}
                                type="submit"
                                style={{
                                    backgroundColor: '#E8843C', 
                                    borderColor: '#E8843C', 
                                    borderRadius: '30px', 
                                    fontFamily: 'Arial', 
                                    paddingLeft: '15px', 
                                    paddingRight: '15px', 
                                    marginRight: '60px',
                                    marginBottom: '50px' 
                                }}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelEventPopup;
