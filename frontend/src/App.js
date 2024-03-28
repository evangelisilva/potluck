import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RSVP from './pages/RSVP';
// import RSVPPage from './pages/RSVPPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import EventPage from './pages/EventPage';
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
      </Routes>
    </Router>
  );
};

export default App;
