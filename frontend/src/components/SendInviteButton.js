import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class SendInviteButton extends React.Component {
  handleClick = async () => {
    const { eventId, to } = this.props;

    try {
      // Fetch event details
      const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
      const event = response.data;

      // Construct invitation body
      const invitationBody = {
        event: {
          title: event.title,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          streetAddress1: event.location.streetAddress1,
          city: event.location.city,
          state: event.location.state,
          zipCode: event.location.zipCode,
        },
        invitedGuests: to,
      };

      // Send invitations
      await axios.post(`http://localhost:8000/api/events/${eventId}/invite`, invitationBody);
      console.log('Invitations sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <Button 
        style={{ 
          backgroundColor: '#E8843C', 
          borderColor: '#E8843C', 
          borderRadius: '30px', 
          fontFamily: 'Arial', 
          paddingLeft: '15px', 
          paddingRight: '15px', 
          marginRight: '60px' 
        }} 
        onClick={this.handleClick}>
          Send Invites
      </Button>
    );
  }
}

export default SendInviteButton;
