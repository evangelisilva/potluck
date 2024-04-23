import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';

const DishRecognizePopup = ({ onClose, eventId }) => {
    const [image, setImage] = useState(null);
    const [textResult, setTextResult] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);

            console.log(formData);

            const response = await axios.post(`http://localhost:8000/api/dishes/recognize-dish/${eventId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            setTextResult(data.text);
            openTextResultWindow(data.text, imagePreview); // Open new window with text and image
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const openTextResultWindow = (text, imageSrc) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <body style="margin-right: 40px; margin-left: 40px;">
                    <div>
                        <img src="${imageSrc}" alt="Uploaded" style="width: auto; height: 300px;" />
                    </div>
                    <div style="font-family: Arial;">${text}</div>
                </body>
            </html>
        `);
        newWindow.document.close();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '350px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                            
                                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px' }}>What's the Dish?</h2>

                            <hr style={{ borderTop: '1px solid #ccc' }} />

                            <div>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                                        Recognize the dish from an image. Upload the image and click "Recognize" to see the results.
                                    </Form.Text>
                                    <Form.Group controlId="formFile" className="mb-3" style={{ marginTop: '15px' }}>
                                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                                    </Form.Group>
                                    <Row>
                                        <Col>
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
                                                    // marginRight: '10px',
                                                    color: ' #4D515A',
                                                    marginTop: '20%',
                                                    marginLeft: '75%',
                                                }}>
                                                Cancel
                                            </Button>
                                        </Col>
                                        <Col>
                                                {loading ? (
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                    disabled
                                                    style={{
                                                        backgroundColor: '#E8843C',
                                                        borderColor: '#E8843C',
                                                        borderRadius: '30px',
                                                        fontFamily: 'Arial',
                                                        paddingLeft: '15px',
                                                        paddingRight: '15px',
                                                        marginTop: '20%',
                                                        marginLeft: '20%',
                                                        width: '125px'
                                                    }}
                                                >
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    disabled={loading}
                                                    style={{
                                                        backgroundColor: '#E8843C',
                                                        borderColor: '#E8843C',
                                                        borderRadius: '30px',
                                                        fontFamily: 'Arial',
                                                        paddingLeft: '15px',
                                                        paddingRight: '15px',
                                                        marginTop: '20%',
                                                        marginLeft: '30%',
                                                    }}
                                                >
                                                    Recognize
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                    
                                    

                                </Form>
                                
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishRecognizePopup;
