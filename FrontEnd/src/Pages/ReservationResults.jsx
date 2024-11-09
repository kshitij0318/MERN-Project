import React from 'react';
import { useLocation } from 'react-router-dom';

const ReservationResults = () => {
  const location = useLocation();
  const { reservations } = location.state || { reservations: [] };

  if (reservations.length === 0) {
    return (
      <div>
        <h2>No reservations found.</h2>
      </div>
    );
  }

  return (
    <section>
      <h2>Found Reservations</h2>
      <table>
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
    </section>
  );
};

export default ReservationResults;
