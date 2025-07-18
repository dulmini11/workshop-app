import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
import heroImage from '../../assets/hero.png';

const HomePage = () => {
  // State to store current mouse position within the hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Function to handle mouse movement and update state with relative position
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);// Attach mousemove event listener to hero section
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);// Cleanup: remove the event listener when component unmounts
    }
  }, []);

  const gradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(90, 60, 255, 0.15) 0%, 
                 rgba(147, 51, 234, 0.1) 25%, 
                 rgba(3, 6, 26, 0.8) 50%, 
                 rgba(3, 6, 26, 1) 100%)`
  };

  return (
    <div className="hero-section" style={gradientStyle}>
      {/* Animated Background Elements */}
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      
      {/* Hero Text Content */}
      <div className="hero-text">
        <div className="text-glow">
          <h1>
            Spark your curiosity, <br />
            <span className="highlight">fuel your ambition</span> - <br />
            grow your skills and lead the future.
          </h1>
        </div>
        
        <p>
          Explore hands-on workshops, register with ease, and shape your future with every skill you learn.
        </p>
        
        <div className="cta-buttons">
          <button className="btn-primary">
            <span>Get Started</span>
          </button>
          <button className="btn-secondary">
            <span>Learn More</span>
          </button>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="hero-image glow-effect">
        <div className="image-container">
          <div className="image-backdrop"></div>
          <img src={heroImage} alt="Hero" className="pulse-effect" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;