import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import NewEventPage1 from './NewEventPage1';
import Page2Content from './Page2Content';
import Page3Content from './Page3Content'; 
import Page4Content from './Page4Content'; 
import SignupNavbar from '../components/SignupNavbar';

// Component for managing a multi-page event creation form
function NewEvent() {
    const navigate = useNavigate(); // Get history from React Router

    // State to track the current page number
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4; // Total number of pages

    // Function to handle moving to the next page
    const nextPage = () => {
        // If it's the last page, navigate to a different page
        if (currentPage === totalPages) {
            navigate('/different-page');
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle moving to the previous page
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Render different content based on the current page number
    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return <NewEventPage1 />;
            case 2:
                return <Page2Content />;
            case 3:
                return <Page3Content />;
            case 4:
                return <Page4Content />;
            default:
                return <div>No content available for this page</div>;
        }
    };

    return (
        <div>
            {/* Include SignupNavbar */}
            <SignupNavbar />

            {/* Render current page content */}
            {renderPageContent()}

            {/* Pagination buttons */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '80px', padding: '10px', textAlign: 'right', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* Display current step and total steps */}
                <span style={{ fontFamily: 'Inter', color: ' #4D515A', marginRight: 'auto', marginLeft: '250px',}}>Step {currentPage} of {totalPages}</span>
                {/* Render "Previous" button */}
                {currentPage > 1 && <Button 
                                        variant="primary" 
                                        onClick={prevPage}
                                        style={{ 
                                            paddingLeft: '17px', 
                                            paddingRight: '18px', 
                                            paddingTop: '8px', 
                                            paddingBottom: '8px', 
                                            borderRadius: '30px', 
                                            backgroundColor: 'transparent', 
                                            borderColor: '#4D515A', 
                                            fontSize: '19px',
                                            fontFamily: 'Inter',
                                            color: ' #4D515A'
                                        }}>Back</Button>}
                {/* Render "Next" button */}
                <Button 
                    variant="primary" 
                    onClick={nextPage}
                    style={{ 
                        marginLeft: '10px',
                        paddingLeft: '17px', 
                        paddingRight: '18px', 
                        paddingTop: '8px', 
                        paddingBottom: '8px', 
                        borderRadius: '30px', 
                        backgroundColor: '#E8843C', 
                        borderColor: '#E8843C', 
                        fontSize: '19px',
                        fontFamily: 'Inter',
                        marginRight: '250px',
                    }}>{currentPage === totalPages ? 'Next' : 'Next'}</Button>
            </div>
        </div>
    );
}

export default NewEvent;
