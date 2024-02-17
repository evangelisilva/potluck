import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SignupButton from './SignupButton';

// This component represents the navigation bar of the application.
// It includes the logo, brand name, navigation links, and a signup button.
const SignupNavbar = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  // Function to check if a link is active based on its href
  const isLinkActive = (href) => {
    return location.pathname === href;
  };

  // Return JSX for the SignupNavbar component
  return (
    <Navbar expand="lg" className="px-lg-5" style={{paddingTop: '15px'}}>
      <Navbar.Brand>
        {/* Logo */}
        <Image
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Logo"
          style={{ maxHeight: '45px', paddingRight: '15px'}}
        />
        {/* Brand name */}
        <span style={{ fontFamily: 'Inter', color: '#4D515A', fontSize: '21px' }}>Potluck</span>
      </Navbar.Brand>
      {/* Navbar toggle button */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {/* Navbar collapsible content */}
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Navbar links */}
        <Nav className="ms-auto">
          {/* Home link */}
          <NavLink href="/" isActive={isLinkActive('/')}>Home</NavLink>
          {/* About link */}
          <NavLink href="/about" isActive={isLinkActive('/about')}>About</NavLink>
          {/* Contact us link */}
          <NavLink href="/contact" isActive={isLinkActive('/contact')}>Contact us</NavLink>
          {/* Signup button */}
          <SignupButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// NavLink component definition
const NavLink = ({ href, isActive, children }) => (
  // Nav link with style and children
  <Nav.Link href={href} style={{ fontWeight: isActive ? 'bold' : '', paddingRight: '45px' }}>
    {/* Link text */}
    <span style={{ fontFamily: 'Inter', color: '#4D515A', fontSize: '17px' }}>{children}</span>
  </Nav.Link>
);

// Export SignupNavbar component
export default SignupNavbar;