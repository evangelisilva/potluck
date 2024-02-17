import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

// This component represents a button used for signing up.
// It changes its appearance when hovered over, providing visual feedback to the user.
function SignupButton() {
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

    // Return JSX for the SignupButton component
    return (
        <Button 
            variant="outline-secondary" 
            href="/signup" 
            style={{ 
                borderRadius: '30px', 
                fontFamily: 'Inter', 
                color: hovered ? '#FFFFFF' : '#4D515A', 
                backgroundColor: hovered ? '#4D515A' : 'transparent',
                border: '1px solid #4D515A',
                fontSize: '17px',
                paddingLeft: '19px',
                paddingRight: '19px'
            }}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
            Sign up
        </Button>
    );
}

export default SignupButton;
