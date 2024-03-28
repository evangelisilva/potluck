import "../../CSS/HomeHero.css";
import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect} from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {notify} from '../../util'
import { createEvent, editEvent } from "../../network";
import { useLocation, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
  
const EventWizard = () => {
    
  const location = useLocation();
  const params = useParams();
  const [id, setId] = React.useState(0);
  const [eventName, setEventName] = React.useState("");
  const [eventDesc, setEventDesc] = React.useState("");
  const [eventDate, setEventDate] = React.useState(new Date());
  const [eventTheme, setEventTheme] = React.useState("");
  const [eventAddr, setEventAddr] = React.useState("");
  const [eventCity, setEventCity] = React.useState("");
  const [eventState, setEventState] = React.useState("");
  const [eventPhone, setEventPhone] = React.useState("");
  const [inputFNameValues, setInputFNameValues] = React.useState([]);
  const [inputLNameValues, setInputLNameValues] = React.useState([]);
  const [inputEmailValues, setInputEmailValues] = React.useState([]);
  const [inputDishList, setInputDishList] = React.useState([]);
  const [inputDishQuantity, setInputDishQuantity] = React.useState([]);

  const updateState = () => {
    setId(Number(params.id));
    var eventObject = null;
    
    if (!!params.id) {
      eventObject = location.state.event;
    }
    if (!!eventObject) {
      console.log(eventObject);
      const date = eventObject.startTime;
      if (!!date) {
        setEventDate(new Date(date));
      }
      setEventName(eventObject.title || "");
      setEventDesc(eventObject.description || "");
      setEventTheme(eventObject.theme || "");
      setEventAddr(eventObject.location || "");
      
      if (!!eventObject.invitees) {
        var tempFname = [];
        var tempLname = [];
        var tempEmail = [];
        for (var i = 0 ; i < eventObject.invitees.length; i++) {
          tempFname.push(eventObject.invitees[i]["firstname"]);
          tempLname.push(eventObject.invitees[i]["secondname"]);
          tempEmail.push(eventObject.invitees[i]["email"]);
        }
        setInputFNameValues(tempFname);
        setInputLNameValues(tempLname);
        setInputEmailValues(tempEmail);
      }

      if (!!eventObject.dish) {
        console.log(eventObject.dish)
        var tempList = [];
        var tempQuantity = [];
        for (var i = 0 ; i < eventObject.dish.length; i++) {
          tempList.push(eventObject.dish[i]["name"]);
          tempQuantity.push(eventObject.dish[i]["quantity"]);
        }
        setInputDishList(tempList);
        setInputDishQuantity(tempQuantity);
      }

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
    console.log("ge")
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

  const handleAddRowDish = () => {
    setInputDishList(prevValues => [...prevValues, '']);
    setInputDishQuantity(prevValues => [...prevValues, '']);
  };

  const handleAddInviteeInput = () => {
    handleAddRowFNameInput();
    handleAddRowLNameInput();
    handleAddRowEmailInput();
  };

  const handleComplete = () => {
    const combinedName = inputFNameValues.map((item, index) => [item, inputLNameValues[index], inputEmailValues[index]]);
    const combinedDish = inputDishList.map((item, index) => [item, inputDishQuantity[index]]);
    const date = eventDate.toISOString().split("T");
    const time = date[1].split(".")
    
    const eventCreate = {
      "name": eventName,
      "description": eventDesc,
      "startTime": date[0] + " " + time[0],
      "location": eventAddr + ", " + eventCity + ", " + eventState,
      "phone": eventPhone,
      "theme": eventTheme,
      "invitees": combinedName,
      "dish": combinedDish,
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
                  <div className="event-title custom-react-datepicker-wrapper">Date and Time</div>
                  <DatePicker
                  wrapperClassName="custom-react-datepicker-wrapper"
                  className="form-control full-width"
                    selected={eventDate}
                    onChange={(date) => setEventDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy-MM-dd hh:mm:ss"
                  />
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
        <FormWizard.TabContent>
          <div className="event-wizard-content flex-containers">
            <div>
              <div className="event-heading">
                Dish List
              </div>
              <div className="flex-containers">
                <div className="full-width">
                  <div className="event-title">Dish Name</div>
                  <div id="inputContainer">
                    {inputDishList.map((value, index) => (
                      <input key={index} className="form-control input-area-height" type="text" value={value} onChange={(e) => {
                        const newInputValues = [...inputDishList];
                        newInputValues[index] = e.target.value;
                        setInputDishList(newInputValues);
                      }} />
                    ))}
                  </div>
                  <div className="add-row-button" style={{ textAlign: "center" }} onClick={handleAddRowDish}>
                    Add Row
                  </div>
                </div>
                <div style={{ width: "100%", marginLeft: "15px" }}>
                  <div className="event-title">Quantity</div>
                  <div id="inputContainer">
                    {inputDishQuantity.map((value, index) => (
                      <input key={index} className="form-control input-area-height" type="text" value={value} onChange={(e) => {
                        const newInputValues = [...inputDishQuantity];
                        newInputValues[index] = e.target.value;
                        setInputDishQuantity(newInputValues);
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