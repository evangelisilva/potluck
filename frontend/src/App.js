import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RSVP from './Pages/RSVP';
// import RSVPPage from './pages/RSVPPage';
import HomePage from './Pages/HomePage';
import NewEventPage from './Pages/NewEventPage';
import EventPage from './Pages/EventPage';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import { ToastContainer } from 'react-toastify';

import EventCreation from "./Pages/EventCreation";
import Events from "./Pages/Events";
import Login from "./Pages/Login";
import EventView from "./Components/User/UserEventView";

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
        {/* <Route path="/rsvp/:eventId" element={<Layout><RSVPPage/></Layout>} /> */}
        <Route path="/hh" element={<Layout>
              <HomePage />
            </Layout>} />
        <Route path="/event-creation" element={<EventCreation />} />
        <Route path="/event-creation/:id" element={<EventCreation />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<EventView />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
