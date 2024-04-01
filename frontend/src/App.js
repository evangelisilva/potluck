import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RSVP from './pages/RSVP';
// import RSVPPage from './pages/RSVPPage';
import { ToastContainer } from 'react-toastify';

// import EventCreation from "./pages/EventCreation";
// import Events from "./pages/Events";
// import Login from "./pages/Login";
// import EventView from "./components/User/UserEventView";
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import EventPage from './pages/EventPage';
import SignupNavbar from './components/SignupNavbar';
import axios from 'axios';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';

const Layout = ({ children }) => {
  return (
    <div>
      <div style={{ paddingTop: '80px' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => {

  // hardcoded userId
  const userId = '65d37b9cf608ce904718e317'
  const userId2 = '65d37b72f608ce904718e313'
  const userId3 = '65d37b96f608ce904718e315'
  const eventId = '65d39315f2a7f4725441f1a9'
  // Remove these here - since it will be easier just to pull the event cuisines directly in the Python code
  //const eventCuisines = ['American', 'Japanese', 'Thai', 'Italian']
  const mealCourse = "Main course"
  const preferredPrepTime = 60
  const preferredComplexity = "Medium"
  const preferredPopularity = "Medium"

  const recommendationData = {eventId : eventId, mealCourse : mealCourse, 
  preferredPrepTime : preferredPrepTime,
  preferredComplexity : preferredComplexity,
  preferredPopularity : preferredPopularity}

  const recommendationData2 = {

    eventId: '65d39315f2a7f4725441f1a9',
    mealCourse: 'Appetizer',
    preferredPrepTime: 60,
    preferredComplexity: 'Medium',
    preferredPopularity: 'Medium'

  }

  const recommendationData3 = {
    eventId: '65d39315f2a7f4725441f1a9',
    mealCourse: 'Main course',
    preferredPrepTime: 30,
    preferredComplexity: 'Low',
    preferredPopularity: 'Low'
  }

  // For testing the overall project: likely ONLY TEST 3 items for recommendation overall
  /*
  const recommendationData4 = {
    userId: '65d37b9cf608ce904718e317',
    eventId: '65d39315f2a7f4725441f1a9',
    mealCourse: 'Dessert',
    preferredPrepTime: 60,
    preferredComplexity: 'Medium',
    preferredPopularity: 'Medium'
  }
  */

  // Do an axios post request (preqreq: change the route in routes to be a post instead of get)
  axios.post(`http://localhost:8000/api/dishSignups/recommendDishes/${userId3}`, recommendationData3)
  .then(response => {
    // Handle success, if needed
    console.log("Dish recommendation response: ");
    // this data element should give the list of dishes recommended
    console.log(response.data);
  })
  .catch(error => {
    // Handle error, if needed
    console.error(error);
  });


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/rsvp/:eventId" element={<Layout><RSVP/></Layout>} />
        <Route path="/events/new" element={<Layout><NewEventPage /></Layout>} />
        <Route path="/events/:eventId" element={<Layout><EventPage /></Layout>} />
        <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
        <Route path="/signin" element={<Layout><SigninPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        {/* <Route path="/rsvp/:eventId" element={<Layout><RSVPPage/></Layout>} /> */}
        <Route path="/hh" element={<Layout>
              <HomePage />
            </Layout>} />
        {/* <Route path="/event-creation" element={<EventCreation />} />
        <Route path="/event-creation/:id" element={<EventCreation />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<EventView />} /> */}
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
