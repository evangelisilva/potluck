import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const DishRecognizePopup = ({ onClose, onConfirm }) => {
    const [image, setImage] = useState(null);
    const [textResult, setTextResult] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

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

        if (!image) {
            alert('Please select an image first.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await axios.post('http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/generate-text-from-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            setTextResult(data.text);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <Container style={{ width: '600px', height: '800px', margin: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                        <Row>
                            <Col xs={10}>
                            <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px', marginBottom: '15px' }}>What's the Dish?</h2>
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
                                    border: 'None',
                                    fontFamily: 'Arial',
                                    color: '#4D515A',
                                    marginTop: '10px',
                                    marginBottom: '30px'
                                }}>
                                <Image src={process.env.PUBLIC_URL + '/cross.png'} style={{ marginLeft: '30px', maxWidth: '15px' }} fluid />
                            </Button>
                            </Col>
                        </Row>
                       
                            
                            <hr style={{ borderTop: '1px solid #ccc'}} />

                            <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
                                <Form onSubmit={handleSubmit}>

                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Row>
                                                    <Form.Label>Select an image</Form.Label>
                                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                                                </Row>
                                            </Form.Group>
                                            
                                        </Col>
                                        <Row>
                                            <Col xs={8}>
                                            </Col>
                                            <Col>
                                                <Button variant="primary" type="submit" style={{ borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginLeft: '71px' }} >
                                                    Recognize
                                                </Button>
                                                
                                            </Col>
                                            {imagePreview && (
                                                <div>
                                                    <img src={imagePreview} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />
                                                </div>
                                            )}
                                        </Row>
                                    </Row>
                                </Form>
                                
                                {textResult && (
                                    <div style={{ maxHeight: '90%', overflowY: "auto", marginTop:"10px" }} dangerouslySetInnerHTML={{ __html: textResult }}></div>
                                )}
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishRecognizePopup;
