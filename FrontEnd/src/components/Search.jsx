import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchReservation = () => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use this for navigation

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!PhoneNumber) {
      toast.error("Please enter a phone number to search.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/reservation/search?PhoneNumber=${PhoneNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Navigate to the results page and pass the reservations as state
      navigate("/reservation-results", { state: { reservations: data.data } });
      toast.success("Reservations found.");
    } catch (error) {
      toast.error(error.response?.data?.message || "No reservation found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-reservation" id="search-reservation">
      <div className="container">
        <div className="banner">
            <img src="./pasta.jpg" alt="" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>SEARCH A RESERVATION</h1>
            <p>Enter the phone number to search for a reservation</p>
            <form onSubmit={handleSearch}>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "SEARCH NOW"}{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchReservation;
