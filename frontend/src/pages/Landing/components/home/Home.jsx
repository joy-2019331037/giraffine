import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <section className="landing_home" >
      <div className="landing_home_content">
        <h3>welcome to <br /> <span>Giraffine Academy</span></h3>
        <p>The platform where your kid meets coding excellence.</p>
        <a onClick={() => { navigate("/login") }} className="btn">Get Started</a>
      </div>
      <div className="image">
        <img src="images/child1.png" alt="home image" />
      </div>
      <div className="custom-shape-divider-bottom-1684324473">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 'auto' }} // Ensure full width
        >
          <defs>
            <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#021B79" />
              <stop offset="100%" stopColor="#0575E6" />
            </linearGradient>
          </defs>
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="url(#gradient)" // Use the gradient here
          />
        </svg>
      </div>
    </section>
  );
}

export default Home;
