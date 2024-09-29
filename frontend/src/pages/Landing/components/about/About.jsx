import Lottie from "lottie-react";
import React, { useState } from "react";
import about1 from "./Animation - 1726937299409.json";
import "./about.css";

function About() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    if (expanded) {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    }
    setExpanded(!expanded);
  };

  return (
    <section className="landing_about">
      <h1 style={{fontSize:"2.5rem"}} className="heading">
        <span>about</span> us
      </h1>
      <div className="row">
        
          <img  className="image" src="images/about-us.png" alt="About Us" />
       
        <div className="content">
          <h3>Empowering Young Minds, One Line of Code at a Time</h3>
          <p>
            At Giraffine Academy, we’re dedicated to sparking curiosity and
            creativity in kids through the power of coding. Our mission is to
            make programming fun and approachable, offering a space where young
            learners can dive into the world of technology. We believe that
            coding is more than just a skill—it's a way to think critically,
            solve problems, and bring ideas to life.
          </p>
          <p>
            Our carefully crafted lessons and interactive activities are
            designed to engage kids and foster a love for learning. Whether
            they’re building games, designing apps, or exploring digital art, we
            guide them every step of the way.
          </p>
          {/* {!expanded && (
            <a onClick={toggleExpansion} className="btn">
              Read more
            </a>
          )} */}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <>
          <div className="row">
            <div className="content">
              <h3>Creating Tomorrow's Innovators</h3>
              <p>
                At Giraffine Academy, we believe every child has the potential
                to be a creator of tomorrow’s technology. Our platform is built
                to nurture that potential through hands-on learning and playful
                challenges. From their first line of code to more advanced
                projects, we empower kids to take ownership of their learning
                journey. With a strong focus on collaboration and creativity, we
                help young coders see the endless possibilities that programming
                offers. Together, we’re shaping a future where kids don’t just
                use technology—they create it!
              </p>
              <p>
                We emphasize learning by doing. Through project-based challenges
                and fun activities, kids not only grasp coding concepts but also
                apply them creatively. Our goal is to build confidence in their
                skills while ensuring that the journey is as rewarding as the
                results. Every step forward is a step toward mastery!
              </p>
            </div>
            <div className="image">
              {/* <img src="images/about-us.png" alt="Innovation" /> */}
              <Lottie animationData={about1} />
            </div>
          </div>

          <a onClick={toggleExpansion} className="btn">
            See less
          </a>
        </>
      )}
    </section>
  );
}

export default About;
