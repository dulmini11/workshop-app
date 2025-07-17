import React from 'react';
import './HomePage.css';
import heroImage from '../../assets/hero.png'; 

const HomePage = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>
          Spark your curiosity, <br />
          <span className="highlight">fuel your ambition</span> — <br />
          grow your skills and lead the future.
        </h1>
        <p>
          Explore hands-on workshops, register with ease, and shape your future with every skill you learn.
        </p>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
};

export default HomePage;
