import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Success from './Pages/Success';
import NotFound from './Pages/NotFound';
import SearchReservation from './components/Search'; // Import the SearchReservation component
import ReservationResults from './Pages/ReservationResults'; // Import the ReservationResults component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/search-reservation" element={<SearchReservation />} /> {/* Add route for search reservation */}
        <Route path="/reservation-results" element={<ReservationResults/>} /> {/* Add route for reservation results */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
