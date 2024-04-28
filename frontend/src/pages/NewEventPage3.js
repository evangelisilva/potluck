import React, { useState } from 'react';
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function NewEventPage3({handleDishCategoryChange, handleEventDataChange}) {
    // State to manage the rows dynamically
    const [rows, setRows] = useState([{ name: '', category: '', slot_count: '', quantity: '', notes: '' }]);

    const categories = ['Appetizer', 'Main course', 'Dessert', 'Beverage', 'Side Dish', 'Salad', 'Utensils', 'Other'];
    const cuisines = [
        'Any','International','Italian','Mexican','Chinese','Indian','Japanese','Thai','French','Spanish','Greek','Mediterranean','Middle Eastern','Korean',
        'Vietnamese','Brazilian','Russian','African','Caribbean','American','British','German','Australian','Canadian','Scandinavian','Dutch','Indonesian',
        'Malaysian','Turkish','Lebanese','Moroccan','Peruvian','Argentinian','Portuguese','Swiss','Irish','Polish','Hungarian','Czech','Belgian','Austrian',
        'Swedish','Finnish','Norwegian','Danish','Slovak','Croatian','Thai','Ethiopian','Nigerian','South African','Egyptian','Israeli','Iraqi','Iranian',
        'Afghan','Pakistani','Bangladeshi','Sri Lankan','Nepalese','Tibetan','Mongolian','Filipino','Singaporean','Malaysian','Indonesian','Vietnamese',
        'Cambodian','Laotian','Burmese','Kazakh','Uzbek','Turkmen','Tajik','Kyrgyz','Moldovan','Romanian','Bulgarian','Ukrainian','Lithuanian','Latvian',
        'Estonian','Albanian','Slovenian','Cypriot','Maltese','Icelandic','Greenlandic','Guatemalan','Salvadoran','Honduran','Nicaraguan','Costa Rican',
        'Panamanian','Cuban','Jamaican','Bahamian','Trinidadian and Tobagonian','Barbadian','Puerto Rican','Haitian','Dominican','Brazilian','Colombian',
        'Venezuelan','Ecuadorian','Chilean','Bolivian','Paraguayan','Uruguayan','Argentinian'
    ];    

    // Function to handle adding a new row
    const handleAddRow = () => {
        setRows([...rows, { name: '', category: '', slot_count: '', quantity: '', notes: '' }]);
    };

    const handleChange = (index, key, value) => {
        const newRows = [...rows];
        newRows[index][key] = value;
        setRows(newRows);
    
        const newItem = newRows.map(row => ({
            name: row.name.trim(), // Trim to remove leading/trailing spaces
            category: row.category, // Use consistent naming
            slot_count: parseInt(row.slot_count) || 0, // Use consistent naming
            quantity: parseInt(row.quantity) || 0, // Use consistent naming
            notes: row.notes,
        }));
        handleDishCategoryChange(newItem);
    };

    return (
        <Container>
            <Row>
                {/* Left column */}
                <Col style={{ paddingTop: '50px', color: '#4D515A', fontFamily: 'Arial' }}>
                    {/* Event Title */}
                    <h2 style={{ fontFamily: 'Times New Roman', fontSize: '45px' }}>What should guests bring?</h2>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col xs={2}>
                                <Form.Label>Expected Guest Count</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    required 
                                    onChange={(e) => handleEventDataChange('expectedCount', e.target.value)}/>
                                
                            </Col>
                            <Col xs={10}>
                                <Form.Label>Cuisines</Form.Label>
                                <Typeahead
                                    id="cuisines"
                                    multiple
                                    options={cuisines}
                                    required
                                    onChange={(selectedOptions) => handleEventDataChange('cuisines', selectedOptions)}
                                />   
                            </Col>
                        </Row>
                        <hr style={{ borderTop: '1px solid #ccc' }} />
                        <Form.Text style={{ color: 'gray', fontSize: '13px' }}>
                            If you're not ready to specify items for guests to bring just yet, feel free to skip this step.
                        </Form.Text> 
                        <Row style={{paddingTop: '25px' }}>
                            <Col>
                                <Form.Label>Item Name</Form.Label> 
                            </Col>
                            <Col>
                                <Form.Label>Category</Form.Label> 
                            </Col>
                            <Col>
                                <Form.Label>Slot count</Form.Label> 
                            </Col>
                            <Col>
                                <Form.Label>Quantity per slot</Form.Label> 
                            </Col>
                            <Col  style={{eidth: '400px'}}>
                                <Form.Label style={{eidth: '400px'}}>Notes</Form.Label> 
                            </Col>
                        </Row>
                        {/* Scrollable container for rows */}
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '15px' }}>
                            {/* Render rows */}
                            {rows.map((row, index) => (
                                <Row key={index} style={{ marginBottom: '10px' }}>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={row.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                    <Form.Select
                                            defaultValue=""// or defaultValue={undefined}
                                            value={row.category}
                                            onChange={(e) => handleChange(index, 'category', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled hidden></option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            value={row.slot_count}
                                            onChange={(e) => handleChange(index, 'slot_count', e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col style={{eidth: '400px'}}>
                                        <Form.Control
                                            type="text"
                                            value={row.notes}
                                            onChange={(e) => handleChange(index, 'notes', e.target.value)}
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
            </Row>
        </Container>
    );
}

export default NewEventPage3;
