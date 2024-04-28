import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class SendInviteButton extends React.Component {
  handleClick = async () => {
    const { eventId, to, onSuccess, onResponse } = this.props;

    try {
      // Fetch event details
      const response = await axios.get(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/events/${eventId}`);
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
      const inviteResponse = await axios.post(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/events/${eventId}/invite`, invitationBody);
      console.log('Invitations sent successfully');
      console.log(inviteResponse);

      // Call onSuccess callback to close the popup
      if (typeof onSuccess === 'function') {
        onSuccess();

      // Call onResponse callback to pass the response data back to the parent component
      if (typeof onResponse === 'function') {
        onResponse(inviteResponse.data);
      }
      }
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
          marginRight: '60px',
          marginBottom: '50px'
        }} 
        onClick={this.handleClick}>
          Send Invites
      </Button>
    );
  }
}

export default SendInviteButton;
