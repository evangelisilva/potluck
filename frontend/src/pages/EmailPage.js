import React from 'react';
import SendEmailButton from '../components/SendEmailButton';
import SignupNavbar from '../components/SignupNavbar';

class EmailPage extends React.Component {
  render() {
    return (
      <div>
        <SignupNavbar />
        <br /><SendEmailButton
                invitee="Jacob"
                host="Evangeli Silva"
                date="2021-06-10"
                time="10:00 AM"
                address="1234 Main Street, Anytown, USA"
                theme="International Cuisine"
                rsvpDeadline="June 15, 2021"
                eventId="1234567890" /> 
      </div>
    );
  }
}

export default EmailPage;
