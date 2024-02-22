import "../../CSS/HomeHero.css";
import React, {useEffect} from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {notify} from '../../util'
import { createEvent, editEvent } from "../../network";
import { useLocation, useParams } from 'react-router-dom';

  
const EventWizard = () => {
    
  const location = useLocation();
  const params = useParams();
  const [id, setId] = React.useState(0);
  const [eventName, setEventName] = React.useState<string>("");
  const [eventDesc, setEventDesc] = React.useState<string>("");
  const [eventDate, setEventDate] = React.useState<string>("");
  const [eventTime, setEventTime] = React.useState<string>("");
  const [eventTheme, setEventTheme] = React.useState<string>("");
  const [eventAddr, setEventAddr] = React.useState<string>("");
  const [eventCity, setEventCity] = React.useState<string>("");
  const [eventState, setEventState] = React.useState<string>("");
  const [eventPhone, setEventPhone] = React.useState<string>("");
  const [inputFNameValues, setInputFNameValues] = React.useState([]);
  const [inputLNameValues, setInputLNameValues] = React.useState([]);
  const [inputEmailValues, setInputEmailValues] = React.useState([]);

  const updateState = () => {
    setId(Number(params.id));
    var eventObject = null;
    
    if (!!params.id) {
      eventObject = location.state.event;
    }
    if (!!eventObject) {
      const date = eventObject.startTime;
      if (!!date) {
        setEventDate(date.split(" ")[0]);
        setEventTime(date.split(" ")[1]);
      }
      setEventName(eventObject.title || "");
      setEventDesc(eventObject.description || "");
      setEventTheme(eventObject.theme || "");
      setEventAddr(eventObject.location || "");
      
      if (!!eventObject.location) {
        var addr = eventObject.location;
        var last = addr.lastIndexOf(",");
        setEventState(addr.slice(last+1).trim() || "");
        addr = addr.slice(0, last).trim() || "";
        setEventAddr(addr);

        last = addr.lastIndexOf(",");
        setEventCity(addr.slice(last+1).trim() || "");
        setEventAddr(addr.slice(0, last).trim() || "");
      }
      setEventPhone(eventObject.phone || "");
    }
  }
  useEffect(() => {
    updateState();
  }, []);

  const handleAddRowFNameInput = () => {
    setInputFNameValues(prevValues => [...prevValues, '']);
  };

  const handleAddRowLNameInput = () => {
    setInputLNameValues(prevValues => [...prevValues, '']);
  };

  const handleAddRowEmailInput = () => {
    setInputEmailValues(prevValues => [...prevValues, '']);
  };

  const handleAddInviteeInput = () => {
    handleAddRowFNameInput();
    handleAddRowLNameInput();
    handleAddRowEmailInput();
  };

  useEffect(() => {
    handleAddInviteeInput();
  }, []);

  const handleComplete = () => {
    const eventTimeChars = eventTime.split('');
    const timeCount = eventTimeChars.filter(char => char === ":").length;
    if (timeCount == 2) {
      setEventTime(eventTime + ":00");
    }

    const eventCreate = {
      "name": eventName,
      "description": eventDesc,
      "startTime": eventDate + " " + eventTime,
      "location": eventAddr + ", " + eventCity + ", " + eventState,
      "phone": eventPhone,
      "theme": eventTheme
    }

    if (!!id) {
      editEvent(id, eventCreate);
    } else {
      createEvent(eventCreate);
    }
    window.location.href = '/events';
  };

  const checkValidateDetails = () => {
    if (eventName === "") {
      return false;
    }
    if (eventDate === "") {
      return false;
    }
    if (eventTime === "") {
      return false;
    }
  };

  const checkValidateLocation = () => {
    if (eventAddr === "") {
      return false;
    }
    if (eventCity === "") {
      return false;
    }
    if (eventState === "") {
      return false;
    }
    return true;
  };

  const errorMessages = () => {
    notify("error", "Please fill in the required fields");
  };

  return (
  <div className="home-hero-container">
      <FormWizard onComplete={handleComplete} color="#E8843C">
        <FormWizard.TabContent>
          <div className="event-wizard-content flex-containers">
            <div>
              <div className="event-heading">
                Start a Potluck
              </div>
              <div className="event-title">
                Event Name
              </div>

              <input className="form-control input-area-height" type="text" value={eventName} onChange={(e) =>
                setEventName(e.target.value)}
              />
              <div className="event-desc">
                Example: Smith Family Reunion, Sunday Morning Brunch
              </div>
              <div className="event-title">
                Description (Optional)
              </div>

              <textarea className="form-control" style={{ innerHeight: "20px" }} cols={4} value={eventDesc} onChange={(e) =>
                setEventDesc(e.target.value)} />
              <div className="event-desc">
                This will appear  at the top of the event page, visible to everyone in
                attendance.
              </div>
              <div className="flex-containers">
                <div className="full-width">
                  <div className="event-title">Date</div>
                  <input className="form-control input-area-height" type="text" value={eventDate} onChange={(e) =>
                    setEventDate(e.target.value)} />
                </div>
                <div style={{ width: "100%", marginLeft: "15px" }}>
                  <div className="event-title">Time</div>
                  <input className="form-control input-area-height" type="text" value={eventTime} onChange={(e) =>
                    setEventTime(e.target.value)} />
                </div>
              </div>
              <div className="event-title">
                Event Theme
              </div>
              <input className="form-control input-area-height" type="text" value={eventTheme} onChange={(e) =>
                setEventTheme(e.target.value)}
              />
            </div>
            <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-1.jpeg' alt='Transparent Image' />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent isValid={checkValidateDetails()} validationError={errorMessages}>
          <div className="event-wizard-content flex-containers">
            <div>
              <div className="event-heading">
                Where is the event happening?
              </div>
              <div className="event-title">
                Address
              </div>
              <input className="form-control input-area-height" type="text" value={eventAddr} onChange={(e) =>
                setEventAddr(e.target.value)}
              />
              <div className="flex-containers">
                <div className="full-width">
                  <div className="event-title">City</div>
                  <input className="form-control input-area-height" type="text" value={eventCity} onChange={(e) =>
                    setEventCity(e.target.value)} />
                </div>
                <div style={{ width: "100%", marginLeft: "15px" }}>
                  <div className="event-title">State/Prov.</div>
                  <input className="form-control input-area-height" type="text" value={eventState} onChange={(e) =>
                    setEventState(e.target.value)} />
                </div>
              </div>
              <div className="event-title">
                Phone (Optional)
              </div>
              <input className="form-control input-area-height" value={eventPhone} onChange={(e) =>
                setEventPhone(e.target.value)} />
            </div>
            <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-2.jpeg' alt='Transparent Image' />
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent isValid={checkValidateLocation()} validationError={errorMessages}>
          <div className="event-wizard-content flex-containers">
            <div>
              <div className="event-heading">
                Add Invitees
              </div>
              <div className="flex-containers">
                <div className="full-width">
                  <div className="event-title">First Name</div>
                  <div id="inputContainer">
                    {inputFNameValues.map((value, index) => (
                      <input key={index} className="form-control input-area-height" type="text" value={value} onChange={(e) => {
                        const newInputValues = [...inputFNameValues];
                        newInputValues[index] = e.target.value;
                        setInputFNameValues(newInputValues);
                      }} />
                    ))}
                  </div>
                  <div className="add-row-button" style={{ textAlign: "center" }} onClick={handleAddInviteeInput}>
                    Add Row
                  </div>
                </div>
                <div style={{ width: "100%", marginLeft: "15px" }}>
                  <div className="event-title">Last Name</div>
                  <div id="inputContainer">
                    {inputLNameValues.map((value, index) => (
                      <input key={index} className="form-control input-area-height" type="text" value={value} onChange={(e) => {
                        const newInputValues = [...inputLNameValues];
                        newInputValues[index] = e.target.value;
                        setInputLNameValues(newInputValues);
                      }} />
                    ))}
                  </div>
                </div>
                <div style={{ width: "100%", marginLeft: "15px" }}>
                  <div className="event-title">Email</div>
                  <div id="inputContainer">
                    {inputEmailValues.map((value, index) => (
                      <input key={index} className="form-control input-area-height" type="text" value={value} onChange={(e) => {
                        const newInputValues = [...inputEmailValues];
                        newInputValues[index] = e.target.value;
                        setInputEmailValues(newInputValues);
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-3.jpeg' alt='Transparent Image' />
          </div>
        </FormWizard.TabContent>
      </FormWizard>
      <style>
        {
          `@import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");`
        }
      </style>
    </div>
  );
  };

  export default EventWizard;