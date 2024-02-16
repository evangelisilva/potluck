import React from 'react';
import SendEmailButton from '../components/SendEmailButton';

class EmailPage extends React.Component {
  render() {
    return (
      <div>
        <br /><SendEmailButton
                invitee="John"
                host="Evangeli Silva"
                date="2021-06-10"
                time="10:00 AM"
                address="1234 Main Street, Anytown, USA"
                theme="International Cuisine"
                rsvpLink="https://www.google.com"
                rsvpDeadline="June 15, 2021"/>
      </div>
    );
  }
}

export default EmailPage;
