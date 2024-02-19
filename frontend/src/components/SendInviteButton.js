import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

class SendInviteButton extends React.Component {
  handleClick = () => {
    const { eventId, to } = this.props;

    // Make a request to the server-side endpoint to send invitations
    fetch(`http://localhost:8000/api/events/${eventId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guests: to // Assuming `to` contains an array of email addresses
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Invitations sent successfully');
      } else {
        console.error('Failed to send invitations');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

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
