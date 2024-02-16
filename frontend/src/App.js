import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailPage from './pages/EmailPage';
import RSVPPage from './pages/RSVPPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailPage />} />
        <Route path="/rsvp/:eventId" component={RSVPPage} />
      </Routes>
    </Router>
  );
};

export default App;


