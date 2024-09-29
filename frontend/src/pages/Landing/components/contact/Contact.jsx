import Lottie from "lottie-react";
import React from "react";
import "./contact.css";
import giraffineGiraffe from "./giraffe.json";

function Contact() {
  return (
    <section className="landing_contact">
      <h1 style={{ fontSize: "2.5rem" }} className="heading">
        <span>contact</span> us
      </h1>
      <div className="icons-container">
        <div className="icons">
          <i className="fas fa-envelope"></i>
          <h3>Email</h3>
          <p>
            <p>giraffine.academy@gmail.com</p>
            <p>
              <a href="mailto:giraffine.academy@gmail.com">Mail Us</a>
            </p>
          </p>
        </div>

        <Lottie className="lottie" animationData={giraffineGiraffe} />
        <div className="icons">
          <i className="fas fa-phone"></i>
          <h3>Phone Number</h3>
          <p>
            <p>+880-152-120-0978</p>
            <p>+880-179-212-9116</p>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
