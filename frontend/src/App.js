import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailPage from './pages/EmailPage';
import RSVPPage from './pages/RSVPPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/email" element={<EmailPage />} />
        <Route path="/rsvp/:eventId" element={<RSVPPage />} />
      </Routes>
    </Router>
  );
};

export default App;
