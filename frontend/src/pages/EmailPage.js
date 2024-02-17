import React from 'react';
import SendInviteButton from '../components/SendInviteButton';

class EmailPage extends React.Component {
  render() {
    const emailAddresses = ['silvaevangeli@gmail.com', 'esilva2@albany.edu'];

    return (
      <div>
        <SendInviteButton
          invitee="Evangeli"
          host="Evangeli Silva"
          date="2021-06-10"
          time="10:00 AM"
          address="1234 Main Street, Anytown, USA"
          theme="International Cuisine"
          rsvpDeadline="June 15, 2021"
          eventId="1234567890"
          to={emailAddresses} />
      </div>
    );
  }
}

export default EmailPage;
