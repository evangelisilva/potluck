import React, { useState } from 'react';
import { Button, Dropdown, Image } from 'react-bootstrap';

// This component represents a button used for signing up.
// It changes its appearance when hovered over, providing visual feedback to the user.
function SignupButton({ userData }) {
    // State to track hover state
    const [hovered, setHovered] = useState(false);

    // Event handler for mouse enter
    const handleMouseEnter = () => {
        setHovered(true);
    };

    // Event handler for mouse leave
    const handleMouseLeave = () => {
        setHovered(false);
    };

    // Function to handle signout
    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    // Render different buttons based on the presence of userData
    if (userData) {
        return (
            <Dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Dropdown.Toggle 
                    variant="outline-secondary" 
                    style={{ color: 'black', borderRadius: '20px', backgroundColor: 'transparent' }} 
                    >
                    <Image src={userData.image} style={{ width: '30px', paddingRight: '10px' }} fluid />
                    {`${userData.firstName} ${userData.lastName}`}

                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/dashboard">My Dashboard</Dropdown.Item>
                    <Dropdown.Item href="/events/new">Create New Event</Dropdown.Item>
                    <Dropdown.Item href="/what's-the-dish">What's the Dish?</Dropdown.Item>
                    <div class="dropdown-divider"></div>
                    <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (
            <Button 
                variant="outline-secondary" 
                href="/signin" 
                style={{ 
                    borderRadius: '30px', 
                    fontFamily: 'Arial', 
                    color: hovered ? '#FFFFFF' : '#4D515A', 
                    backgroundColor: hovered ? '#E8843C' : 'transparent',
                    border: hovered ? 'transparent' : '1px solid #4D515A',
                    fontSize: '17px',
                    paddingLeft: '19px',
                    paddingRight: '19px'
                }}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}>
                Sign In
            </Button>
        );
    }
}

export default SignupButton;
