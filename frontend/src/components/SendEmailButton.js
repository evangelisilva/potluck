import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

// Author: Evangeli Silva
// Description: This component represents a button used for sending email invites.
// It makes a request to a server-side endpoint to send the email with provided details.
class SendEmailButton extends React.Component {
  handleClick = () => {
    const { invitee, host, date, time, address, theme, rsvpDeadline, eventId } = this.props;

    const rsvpLink = 'http://localhost:3000/rsvp/' + eventId;

    // Make a request to the server-side endpoint to send the email
    fetch('http://localhost:8000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'jkoplik@albany.edu',
        templateName: 'ICSI518-Potluck-InvitationTemplate', 
        templateData: JSON.stringify({ invitee, host, date, time, address, theme, rsvpLink, rsvpDeadline }) 
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <Button style={{ borderRadius: '20px', }} onClick={this.handleClick}>Send Invites</Button>
    );
  }
}

export default SendEmailButton;
