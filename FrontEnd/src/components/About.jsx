import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  const [showMenu, setShowMenu] = useState(false); // State to control the display of menu images

  // Function to toggle the menu images visibility
  const handleExploreMenu = () => {
    setShowMenu(true); // Show menu images when button is clicked
  };

  // Function to close the menu images
  const handleCloseMenu = () => {
    setShowMenu(false); // Hide menu images when close button is clicked
  };

  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              Symbi Food Court includes a traditional low-priced Canteen, Café, and a Juice Bar.
              The Canteen serves snacks, beverages, breakfast, and lunch with a variety of items which suit the needs of students
              belonging to different geographical locations of the country and even abroad.
              Frequent random checks are carried out to ensure that the food served by the Food Court is hygienic, tastes good, 
              and is made from good quality ingredients. Spacious building of the food court with good modern furniture and 
              pleasant weather of Pune combined together make it a place where students eat together and indulge in healthy interactions.
            </p>

            <button onClick={handleExploreMenu} className="explore-menu-btn">
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </button>

            {/* Conditionally render menu images */}
            {showMenu && (
              <div className="menu-images-overlay">
                <div className="menu-images">
                  <img src="menu-image-1.jpg" alt="Menu Image 1" />
                  <img src="menu-image-2.jpg" alt="Menu Image 2" />
                </div>
                {/* Close button to hide the images */}
                <button onClick={handleCloseMenu} className="close-menu-btn">
                  Close
                </button>
              </div>
            )}
          </div>

          <div className="banner">
            <img src="ChickenHakka1.jpg" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
