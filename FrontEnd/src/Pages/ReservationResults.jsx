import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const ReservationResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservations } = location.state || { reservations: [] };

  const goToHomePage = () => {
    navigate('/');
  };

  if (reservations.length === 0) {
    return (
      <div className="reservation-results-container">
        <h2 className="no-reservations">No reservations found.</h2>
        <button onClick={goToHomePage} className="home-button">Go to Home Page</button>
      </div>
    );
  }

  return (
    <section className="reservation-results-container">
      <h2>Found Reservations</h2>
      <table className="reservation-results-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.FirstName}</td>
              <td>{reservation.LastName}</td>
              <td>{reservation.Email}</td>
              <td>{reservation.PhoneNumber}</td>
              <td>{reservation.Date}</td>
              <td>{reservation.Time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goToHomePage} className="home-button">Go to Home Page</button>
    </section>
  );
};

export default ReservationResults;
