import "../../CSS/HomeHero.css";
import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect} from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {notify} from '../../util'
import { createEvent, editEvent, userDietRestrictions } from "../../network";
import { useLocation, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
  
const UserEventWizard = (input) => {
  const {eventObject, modalClose} = input; 
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
  const [userAllergans, setUserAllergans] = React.useState("");
  const [userDiet, setUserDiet] = React.useState("");

  const updateState = () => {
    
    if (!!eventObject) {
      console.log(eventObject);
      setId(Number(eventObject.id));
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
    updateState();
  }, []);

  const handleComplete = async () => {

    modalClose();
  };

  return (
  <div className="home-hero-container">
      <FormWizard onComplete={handleComplete} color="#E8843C">
        <FormWizard.TabContent>
          <div className="event-wizard-content ">
            <div>
              <div className="event-heading">
                Event Details
              </div>
              <div className="event-title">
                Event Name
              </div>

              <p className="form-control ">{eventName}</p>
              <div className="event-title">
                Description
              </div>

              <p className="form-control">{eventDesc}</p>
              <div className="">
                <div className="full-width">
                  <div className="event-title custom-react-datepicker-wrapper">Date and Time</div>
                  <DatePicker
                  wrapperClassName="custom-react-datepicker-wrapper"
                  className="form-control full-width"
                    selected={eventDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy-MM-dd hh:mm:ss"
                    disabled
                  />
                </div>
              </div>
              <div className="event-title">
                Event Theme
              </div>
              <p className="form-control ">{eventTheme}</p>
            </div>
            {/* <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-1.jpeg' alt='Transparent Image' /> */}
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent>
          <div className="event-wizard-content ">
            <div>
              <div className="event-heading">
                Where is the event happening?
              </div>
              <div className="event-title">
                Address
              </div>
              <p className="form-control ">{eventAddr}</p>
              <div className="">
                <div className="full-width">
                  <div className="event-title">City</div>
                  <p className="form-control ">{eventCity}</p>
                </div>
                <div className="full-width">
                  <div className="event-title">State/Prov.</div>
                  <p className="form-control ">{eventState}</p>
                </div>
              </div>
              <div className="event-title">
                Phone
              </div>
              <p className="form-control ">{eventPhone}</p>
            </div>
            {/* <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-2.jpeg' alt='Transparent Image' /> */}
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent>
          <div className="event-wizard-content ">
            <div>
              <div className="event-heading">
                Dish List
              </div>
              <div className="">
                <div className="full-width" style={{display: "flex"}}>
                  <div style={{width: "50%"}}>
                  <div className="event-title">Dish Name</div>
                  <div id="inputContainer ">
                    {inputDishList.map((value, index) => (
                      <p key={index} className="form-control ">{value}</p>
                    ))}
                  </div>
                  </div>
                  <div style={{width: "50%"}}>
                  <div className="event-title">Quantity</div>
                  <div id="inputContainer">
                    {inputDishQuantity.map((value, index) => (
                      <p key={index} className="form-control ">{value}</p>
                      ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <img className='hero-trans-image' style={{ marginLeft: "25px", paddingLeft: "25px", width: "40%" }} src='/assets/event-creation-3.jpeg' alt='Transparent Image' /> */}
          </div>
        </FormWizard.TabContent>
        <FormWizard.TabContent>
          <div className="event-wizard-content flex-containers">
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

  export default UserEventWizard;