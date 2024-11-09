import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
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
            Symbi Food Court includes a traditional low priced Canteen,
             Café and a Juice Bar. 
             The Canteen serves snacks, beverages,
            breakfast and lunch with a variety of items which suit the needs of students belonging to
             different geographical locations of the Country and even abroad. 
             Frequent random checks are carried out to ensure that the food served by the Food Court is hygienic, 
             tastes good and is made from good quality ingredients.Spacious building of the food court with good 
             modern furniture and pleasant weather of Pune combined together to make it place where students eat
              together and indulge in healthy interactions.
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
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