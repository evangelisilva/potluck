import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailPage from './pages/EmailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailPage />} />
        {/* <Route path="/addition" element={<AdditionPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;


