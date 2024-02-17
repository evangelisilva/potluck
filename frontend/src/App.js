import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailPage from './pages/EmailPage';
import RSVPPage from './pages/RSVPPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/email" element={<EmailPage />} />
        <Route path="/rsvp/:eventId" element={<RSVPPage />} />
        <Route path="/events/new" element={<NewEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
