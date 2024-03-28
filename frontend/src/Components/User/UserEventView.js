import React, {useEffect} from "react";
import { toast } from 'react-toastify';
import { editEvent, getEvents, userDietRestrictions} from "../../network.js";
import { MdEditCalendar, MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/HomeHero.css";
import Modal from '../EventModal';
import UserEventWizard from "./UserEventWizard";

const UserEventView = () => {
  const [events, setEvents] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [currentEvent, setCurrentEvent] = React.useState({});
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAllerganModalOpen, setIsAllerganModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  const [userAllergans, setUserAllergans] = React.useState("");
  const [userDiet, setUserDiet] = React.useState("");

  const openAllerganModal = () => setIsAllerganModalOpen(true);
  const closeAllerganModal = async() => {
    setIsAllerganModalOpen(false);
    var email = localStorage.getItem("email");
    if (!!userAllergans || userDiet ) {
      userDietRestrictions(email, {userAllergans, userDiet});
    }
  }

  const loadEvents = () => {
    var email = localStorage.getItem("email");
    if (!email || email.length == 0) {
      navigate("/");
      return;
    }

    getEvents(email)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }
  useEffect(() => {
    loadEvents();
  }, []);

  const cancelEvent = (id) => {
    toast.dismiss();

    const eventCreate = {
      "state": 1
    }

    editEvent(id, eventCreate).then(response => {
      loadEvents();
    });
  };

  const cancelNo = () => {
    toast.dismiss();
  };

  const cancelNotify = (eventId) => {
    toast.info(
      <div>
        <div>Do you want to cancel the event?</div>
        <button style={{margin:"10px", padding: "2px"}} onClick={cancelEvent.bind(null, eventId)}>Yes</button>
        <button style={{margin:"10px", padding: "2px"}} onClick={cancelNo}>No</button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        closeButton: false,
      }
    );
  };

  return (
    <div className="home-hero-container">
      <button onClick={openAllerganModal}>My Allergans and Restrictions</button>
      {events && events.length > 0 && (
        <div>
          {events.map((event, index) => (
            <div key={index} className="subtype-row" onClick={() => {
              setCurrentEvent(events[index]);
              openModal();
            }}>
              <div className="event-center"> 
                {/* <img src={event.image ? event.image : "/assets/blank.png" } style={{width: "100%"}}></img> */}
                <div className="flex-containers">
                  <div>
                    <div className="event-heading">
                      {event.title}
                    </div>
                    <div className="event-title">
                      {event.startTime}
                    </div>
                    <div>
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <UserEventWizard eventObject={currentEvent} modalClose={setIsModalOpen}/>
    </Modal>

    <Modal isOpen={isAllerganModalOpen} onClose={closeAllerganModal}>
      <div className="event-wizard-content">
        <div>
          <div className="event-heading">
            Allergans and Dietary Restrictions
          </div>
          <div className="event-title">
            Allergan
          </div>

          <textarea className="form-control" style={{ innerHeight: "20px" }} cols={4} value={userAllergans} onChange={(e) =>
            setUserAllergans(e.target.value)}
          />
          <div className="event-title">
            Dietary Restrictions
          </div>

          <textarea className="form-control" style={{ innerHeight: "20px" }} cols={4} value={userDiet} onChange={(e) =>
            setUserDiet(e.target.value)} />
        </div>
        {/* <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-1.jpeg' alt='Transparent Image' /> */}
      </div>
    </Modal>
    </div>
  );
}

export default UserEventView;