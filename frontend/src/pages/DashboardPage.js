import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Image, Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import SignupNavbar from '../components/SignupNavbar';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const authResponse = await axios.get('http://localhost:8000/api/auth', {
          headers: {
            Authorization: token,
          },
        });

        const userResponse = await axios.get(`http://localhost:8000/api/users/${authResponse.data.userId}`);
        setUserData(userResponse.data);

        const eventResponse = await axios.get('http://localhost:8000/api/events');
        const formattedEventData = eventResponse.data.map(event => ({
          ...event,
          date: formatDate(event.date),
          startTime: formatTime(event.startTime),
          endTime: formatTime(event.endTime),
        }));

        setEventData(formattedEventData);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || 'An error occurred');
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  };

  // Function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedHours = parseInt(hours) % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle 12:00 PM
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${period}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cardStyle = {
    marginBottom: '20px',
    padding: '10px', // Adjust padding
  };

  // Filter events into upcoming and past events
  const currentDate = new Date();
  const upcomingEvents = eventData.filter(event => new Date(event.date) > currentDate);
  const pastEvents = eventData.filter(event => new Date(event.date) <= currentDate);

  return (
    <div>
      <SignupNavbar userData={userData}/>
      <Container style={{color: '#4D515A', fontFamily: 'Arial', paddingTop: '20px' }}>
      <div className="d-flex align-items-center mb-4 mb-md-5">
        <h1 style={{ color: '#4D515A', fontSize: '2rem', marginRight: 'auto', marginBottom: '0'}}>My Dashboard</h1>
        <Link to={`/events/new`}>
          <Button variant="primary" style={{ border: 'none', backgroundColor: '#E8843C', fontSize: '15px', marginRight: '5px' }}>
            + Create New Event
          </Button>
        </Link>
        {/* <Button variant="primary" style={{ borderColor: 'gray', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px' }}>+ Create New Event</Button> */}
      </div>
        {/* <h1 className="mb-4 mb-md-5" style={{ color: '#4D515A', fontSize: '2.1rem', lineHeight: '1.3'}}>My Dashboard</h1> */}
        {/* Display upcoming events */}
        {upcomingEvents.length > 0 && (
          <>
            <h5>Upcoming Events</h5> <br />
            <Row>
              {upcomingEvents.map(event => (
                <Col key={event._id} lg={4} md={6} sm={12} style={cardStyle}>
                  <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/cover.png'} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.1rem' }}>{event.title}</Card.Title>
                      <Card.Text style={{ fontSize: '0.9rem', color: 'gray' }}>
                        {event.date}, {event.startTime} - {event.endTime}
                      </Card.Text>
                      <Card.Text style={{ fontSize: '0.9rem', color: 'gray' }}>
                        <Image src={process.env.PUBLIC_URL + '/pin.png'} style={{ maxWidth: '22px', paddingRight: '5px' }} fluid />
                        {event.location.streetAddress1}, {event.location.city}, {event.location.state}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )} <br/>

        {/* Display past events */}
        {pastEvents.length > 0 && (
          <>
            <h5>Past Events</h5> <br />
            <Row>
              {pastEvents.map(event => (
                <Col key={event._id} lg={4} md={6} sm={12} style={cardStyle}>
                  <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/cover.png'} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.1rem' }}>{event.title}</Card.Title>
                      <Card.Text style={{ fontSize: '0.9rem', color: 'gray' }}>
                        {event.date}, {event.startTime} - {event.endTime}
                      </Card.Text>
                      <Card.Text style={{ fontSize: '0.9rem', color: 'gray' }}>
                        <Image src={process.env.PUBLIC_URL + '/pin.png'} style={{ maxWidth: '22px', paddingRight: '5px' }} fluid />
                        {event.location.streetAddress1}, {event.location.city}, {event.location.state}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;
