import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./Pages/Homepage";
import EventCreation from "./Pages/EventCreation";
import Events from "./Pages/Events";
import EventWizard from "./Components/Homepage/EventWizard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/event-creation" element={<EventCreation />} />
        <Route path="/event-creation/:id" element={<EventCreation />} />
        <Route path="/events" element={<Events />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
