import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ShowAll = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataVisible, setDataVisible] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null); // For tracking the reservation being edited
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Handle show all reservations
  const handleShowAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/reservation/all", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setReservations(data.data); // Assuming data.data contains the reservations array
      toast.success("All reservations retrieved.");
      setDataVisible(true); // Show data after loading
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to retrieve reservations.");
    } finally {
      setLoading(false);
    }
  };

  // Handle closing the data (but not the entire section)
  const handleClose = () => {
    setDataVisible(false); // Hide the reservation data
  };

  // Handle update of reservation
  const handleUpdate = (reservation) => {
    setEditingReservation(reservation);
    setNewDate(reservation.Date);
    setNewTime(reservation.Time);
  };

  // Handle submitting the updated reservation data
  const handleSaveUpdate = async () => {
    if (!newDate || !newTime) {
      toast.error("Please select both date and time.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/v1/reservation/update/${editingReservation._id}`,
        { Date: newDate, Time: newTime },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === editingReservation._id
            ? { ...reservation, Date: newDate, Time: newTime }
            : reservation
        )
      );

      toast.success("Reservation updated successfully.");
      setEditingReservation(null);
      setNewDate("");
      setNewTime("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update reservation.");
    }
  };

  // Handle canceling the update
  const handleCancelUpdate = () => {
    setEditingReservation(null);
    setNewDate("");
    setNewTime("");
  };

  // Handle delete of reservation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/reservation/delete/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
      toast.success("Reservation deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete reservation.");
    }
  };

  return (
    <section className="show-all-reservations">
      <div className="container">
        <h1>All Reservations</h1>
        <button onClick={handleShowAll} disabled={loading}>
          {loading ? "Loading..." : "SHOW ALL"}
        </button>

        {/* Show reservation data if it's visible */}
        {dataVisible && (
          <>
            <div className="reservation-results">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation._id}>
                      <td>{reservation.FirstName}</td>
                      <td>{reservation.LastName}</td>
                      <td>{reservation.Email}</td>
                      <td>{reservation.PhoneNumber}</td>
                      <td>{reservation.Date}</td>
                      <td>{reservation.Time}</td>
                      <td className="actions">
                        <button onClick={() => handleUpdate(reservation)} className="update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(reservation._id)} className="delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={handleClose} className="close-button">
              Close Data
            </button>
          </>
        )}

        {/* Update reservation modal or form */}
        {editingReservation && (
          <div className="update-modal">
            <h2>Update Reservation</h2>
            <form>
              <label>
                Date:
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </label>
              <button type="button" onClick={handleSaveUpdate}>
                Save Changes
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancelUpdate}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {reservations.length === 0 && !loading && !dataVisible && (
          <p>No reservations to display.</p>
        )}
      </div>
    </section>
  );
};

export default ShowAll;
