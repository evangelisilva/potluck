import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';


function NewEventPage3() {
    // State to manage the rows dynamically
    const [rows, setRows] = useState([{ dish: '', quantity: '', notes: '' }]);

    // Function to handle adding a new row
    const handleAddRow = () => {
        setRows([...rows, { dish: '', quantity: '', notes: '' }]);
    };

    // Function to handle changes in input fields
    const handleChange = (index, key, value) => {
        const newRows = [...rows];
        newRows[index][key] = value;
        setRows(newRows);
    };

    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col md={7} style={{ paddingTop: '50px', paddingLeft: '70px', color: '#4D515A', fontFamily: 'Arial' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px' }}>What should guests bring?</h2>
                    
                    <Form.Group>
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            If you're not ready to specify dishes for guests to bring just yet, feel free to skip this step.
                        </Form.Text> 
                        <Row style={{ maxWidth: '650px', paddingTop: '25px' }}>
                            <Col style={{ paddingRight: '12px' }}>
                                <Form.Label style={{width: '200px'}}>Dish</Form.Label> 
                            </Col>
                            <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                <Form.Label style={{width: '70px'}}>Quantity</Form.Label> 
                            </Col>
                            <Col>
                                <Form.Label style={{width: '332px'}}>Notes</Form.Label> 
                            </Col>
                        </Row>
                        {/* Scrollable container for rows */}
                        <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '15px' }}>
                            {/* Render rows */}
                            {rows.map((row, index) => (
                                <Row key={index} style={{ maxWidth: '650px', marginBottom: '10px' }}>
                                    <Col style={{ paddingRight: '12px' }}>
                                        <Form.Control
                                            type="text"
                                            value={row.dish}
                                            onChange={(e) => handleChange(index, 'dish', e.target.value)}
                                            style={{width: '200px'}}
                                            required
                                        />
                                    </Col>
                                    <Col style={{ paddingLeft: '0', paddingRight: '0' }}>
                                        <Form.Control
                                            type="text"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            style={{width: '70px'}}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={row.notes}
                                            onChange={(e) => handleChange(index, 'notes', e.target.value)}
                                            style={{width: '332px'}}
                                            required
                                        />
                                    </Col>
                                </Row>
                            ))}
                        </div>
                        {/* Add rows button */}
                        <Button
                            variant="primary"
                            onClick={handleAddRow}
                            style={{
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                borderRadius: '30px',
                                backgroundColor: 'transparent',
                                borderColor: 'gray',
                                fontSize: '14px',
                                color: '#4D515A'
                            }}
                        >
                            <Image
                                src={process.env.PUBLIC_URL + '/add_rows.png'}
                                alt="Add Rows Icon"
                                style={{ maxHeight: '17px', marginRight: '5px', marginBottom: '3px' }}
                            />
                            Add rows
                        </Button>
                    </Form.Group>
                </Col>
                {/* Right column */}
                <Col md={5}>
                    <Image src={process.env.PUBLIC_URL + '/img_3.jpg'} style={{ paddingTop: '60px', paddingRight: '80px' }} fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default NewEventPage3;
