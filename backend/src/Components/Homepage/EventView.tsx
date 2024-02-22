import React, {useEffect} from "react";
import { toast } from 'react-toastify';
import { editEvent, getEvents } from "../../network";
import { MdEditCalendar, MdOutlineCancel } from "react-icons/md";
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import "../../CSS/HomeHero.css";

const EventView = () => {
  const [events, setEvents] = React.useState([]);

  const loadEvents = () => {
    getEvents()
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
      {events && events.length > 0 && (
        <div>
          {events.map((event, index) => (
            <div key={index} className="subtype-row">
              <div className="event-center">
                <img src={event.image ? event.image : "/assets/blank.png" } style={{width: "100%"}}></img>
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
                  <div>
                    {event.state == 0 && (
                      <div  className="flex-containers">
                        <Link to={{ pathname: `/event-creation/${event.id}`}} state={{ event }}><MdEditCalendar className="event-icon" /></Link>
                        <MdOutlineCancel className="event-icon"  onClick={cancelNotify.bind(null, event.id)}/>
                      </div>
                    )}
                    {event.state == 1 && (
                      <div className="event-title" style={{color: "#B00"}}>
                        EVENT IS CANCELLED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventView;