import React, { useState } from 'react';
import { FaUserCheck } from "react-icons/fa";

const InviteesModal = ({ invitees }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModalOnClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div>
      {invitees.length > 0 && (
        <FaUserCheck className="event-icon" onClick={toggleModal}/>
      )}

      {showModal && invitees.length > 0 && (
        <div className="modal" onClick={closeModalOnClick}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Invitees</h2>
            <ul>
              {invitees.map(invitee => (
                <li key={invitee.firstname}>{invitee.firstname} {invitee.lastname} RSVP: {invitee.rsvp == 0 ? "Not Decided" : (invitee.rsvp == 1 ? "Accepted" : "Declined")}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteesModal;