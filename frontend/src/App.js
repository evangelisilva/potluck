import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RSVP from './pages/RSVP';
// import RSVPPage from './pages/RSVPPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import EventPage from './pages/EventPage';
import SignupNavbar from './components/SignupNavbar';

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
