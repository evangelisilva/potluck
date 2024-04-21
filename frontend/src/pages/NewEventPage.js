import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import NewEventPage1 from './NewEventPage1';
import NewEventPage2 from './NewEventPage2';
import NewEventPage3 from './NewEventPage3'; 
import SignupNavbar from '../components/SignupNavbar';

// Component for managing a multi-page event creation form
function NewEvent() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
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
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUserData();
      }, []);

    // State to track the current page number
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3 // Total number of pages

    // Function to handle moving to the next page
    const nextPage = () => {
        // If it's the last page, navigate to a different page
        if (currentPage === totalPages) {
            // navigate('/events/{event-id}');
            createEvent();
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    // State to store event data
    const [eventData, setEventData] = useState({
        // Initialize with default values
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: {
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            state: '',
            zipCode: ''
        },
        contactNumber: '',
        organizer: '65d377b4f9c8da33b7f3db73',
        invitedGuests: [],
        status: 'active',
        visibility: 'public',
        dishCategory: [],
        coverImage: ''
    });

    const handleDishCategoryChange = (newDishCategory) => {
        setEventData({ ...eventData, dishCategory: newDishCategory });
    };

    // Function to handle moving to the previous page
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Render different content based on the current page number
    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return <NewEventPage1 handleEventDataChange={handleEventDataChange} />;
            case 2:
                return <NewEventPage2 handleEventDataChange={handleEventDataChange} />;
            case 3:
                return <NewEventPage3 handleDishCategoryChange={handleDishCategoryChange} />;
            // case 4:
            //     return <NewEventPage4 />;
            default:
                return <div>No content available for this page</div>;
        }
    };

    // Function to handle changes in event data
    const handleEventDataChange = (name, value) => {
        // If the field is nested inside location
        if (name.startsWith('location.')) {
            const locationField = name.split('.')[1]; // Extract the nested field name
            setEventData({
                ...eventData,
                location: {
                    ...eventData.location, // Preserve other fields in location
                    [locationField]: value // Update the specific nested field
                }
            });
        } else {
            // For other fields, update directly
            setEventData({
                ...eventData,
                [name]: value,
            });
        }
    };

    // Function to create event
    const createEvent = async () => {
        try {
            // Send POST request to create event
            console.log(eventData)
            const response = await axios.post('http://localhost:8000/api/events', eventData);
            console.log('Event created successfully:', response.data);
            const eventId = response.data._id;
            
            eventData.dishCategory.map(async (item, index) => {
                const dishData = {
                    dishName: item.category,
                    description: item.notes,
                    allergens: [],
                    dietaryRestrictions: [],
                    course: item.name,
                };

                try {
                    const response = await axios.post(`http://localhost:8000/api/dishes/`, dishData);
                    console.log(response);
                    const dishId = response.data._id;

                    const token = window.localStorage.getItem('token');

                    const authResponse = await axios.get('http://localhost:8000/api/auth', {
                        headers: {
                            Authorization: token,
                        },
                    });
                    
                    const dishSignupData = {
                        user: authResponse.data.userId,
                        event: eventId,
                        dish: dishId,
                        dishCategory: dishData.course
                    }

                    try {
                        console.log(dishSignupData);
                        await axios.post(`http://localhost:8000/api/dishSignups/`, dishSignupData);
                        console.log('Dish signup successful');
            
                        await axios.put(`http://localhost:8000/api/events/${eventId}/update-taken/${dishSignupData.dishCategory}`);
            
                        // window.location.reload();
                    } catch (error) {
                        console.error('Error signing up for a dish: ', error);
                    }
                } catch (error) {
                    console.error('Error creating dish: ', error);
                }
            })
            navigate(`/events/${response.data._id}`); // Navigate to event page
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div style={{fontFamily: 'Arial'}}>
            <SignupNavbar userData={userData}/>

            {/* Render current page content */}
            {renderPageContent()}

            {/* Pagination buttons */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '80px', padding: '10px', textAlign: 'right', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* Display current step and total steps */}
                <span style={{ color: ' #4D515A', marginRight: 'auto', marginLeft: '250px',}}>Step {currentPage} of {totalPages}</span>
                {/* Render "Previous" button */}
                {currentPage > 1 && <Button 
                                        variant="primary" 
                                        onClick={prevPage}
                                        style={{ 
                                            paddingLeft: '20px', 
                                            paddingRight: '20px',  
                                            borderRadius: '30px', 
                                            backgroundColor: 'transparent', 
                                            borderColor: '#4D515A', 
                                            fontSize: '19px',
                                            color: ' #4D515A'
                                        }}>Back</Button>}
                {/* Render "Next" button */}
                <Button 
                    variant="primary" 
                    onClick={nextPage}
                    style={{ 
                        marginLeft: '10px',
                        paddingLeft: '20px', 
                        paddingRight: '20px', 
                        borderRadius: '30px', 
                        backgroundColor: '#E8843C', 
                        borderColor: '#E8843C', 
                        fontSize: '19px',
                        marginRight: '250px',
                    }}>{currentPage === totalPages ? 'Create Event' : 'Next'}</Button>
            </div>
        </div>
    );
}

export default NewEvent;
