import React from "react";
import "./about.css";
import image1 from "./react images/about.png";

function About() {
  return (
    <div className="about">
      <b>
        “Thanks to Maktabaty, there is no reason to buy books on Amazon
        anymore.”
      </b>
      <div className="container">
        <div>
          <img src={image1} alt="can't load local ressources" />
        </div>
        <div>
          <div>
            Maktabaty works to connect readers with independent booksellers all
            over the world.
          </div>
          ‍
          <p>
            <strong>
              We believe local bookstores are essential community hubs that
              foster culture, curiosity, and a love of reading, and we're
              committed to helping them thrive.
            </strong>
          </p>
          <p>
            Every purchase on the site financially supports independent
            bookstores. Our platform gives independent bookstores tools to
            compete online and financial support to help them maintain their
            presence in local communities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
