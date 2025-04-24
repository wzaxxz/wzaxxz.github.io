import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Events from "./components/Events";
import Bookings from "./components/Bookings";
import About from "./components/About";
import './css/index.css';

function App() {
  // Стейт для збереження бронювань
  const [bookings, setBookings] = useState([]);

  // Функція для додавання бронювання
  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  // Функція для скасування бронювання з підтвердженням
  const cancelBooking = (index) => {
    const confirmed = window.confirm("Ви дійсно хочете скасувати це бронювання?");
    if (confirmed) {
      const updated = [...bookings];
      updated.splice(index, 1);
      setBookings(updated);
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Редірект з "/" на "/events" */}
        <Route path="/" element={<Navigate to="/events" />} />
        <Route path="/events" element={<Events addBooking={addBooking} />} />
        <Route path="/bookings" element={<Bookings bookings={bookings} onCancel={cancelBooking} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
