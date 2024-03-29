import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RSVP from './pages/RSVP';
// import RSVPPage from './pages/RSVPPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import EventPage from './pages/EventPage';
import SignupNavbar from './components/SignupNavbar';
import { getUserById } from '../../backend/services/userService';

const Layout = ({ children }) => {
  return (
    <div>
      <SignupNavbar />
      <div style={{ paddingTop: '80px' }}>
        {children}
      </div>
    </div>
  );
};

const App = () => {

  // hardcoded userId
  const userId = '65d37b9cf608ce904718e317'
  const eventId = '65d39315f2a7f4725441f1a9'
  const eventCuisines = ['American', 'Japanese', 'Thai', 'Italian']
  const mealCourse = "Main course"
  const preferredPrepTime = 60
  const preferredComplexity = "Medium"
  const preferredPopularity = "Medium"

  const recommendationData = {eventId : eventId, eventCuisines : eventCuisines, mealCourse : mealCourse, 
  preferredPrepTime : preferredPrepTime,
  preferredComplexity : preferredComplexity,
  preferredPopularity : preferredPopularity
}
  // Do an axios post request (preqreq: change the route in routes to be a post instead of get)
  /*
  axios.post(`http://localhost:8000/api/dishSignups/recommend/dishes/${userId}`, recommendationData)
  .then(response => {
    // Handle success, if needed
    console.log("Create RSVP response: ");
    // this data element should give the list of dishes recommended
    console.log(response.data);
  })
  .catch(error => {
    // Handle error, if needed
    console.error(error);
  });
  */


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
        {/* <Route path="/rsvp/:eventId" element={<Layout><RSVPPage/></Layout>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
