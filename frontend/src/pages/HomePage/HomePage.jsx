import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
import heroImage from '../../assets/hero.png';
import workshopsData from '../../data/workshops.json'; 

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [workshops, setWorkshops] = useState([]);

  // Set workshops data once on component mount
  useEffect(() => {
    setWorkshops(workshopsData);
  }, []);

  // Track mouse movement inside hero section for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
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
    <>
      <div className="hero-section" style={gradientStyle}>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
        
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
            <button className="btn-primary"><span>Get Started</span></button>
            <button className="btn-secondary"><span>Learn More</span></button>
          </div>
        </div>

        <div className="hero-image glow-effect">
          <div className="image-container">
            <div className="image-backdrop"></div>
            <img src={heroImage} alt="Hero" className="pulse-effect" />
          </div>
        </div>
      </div>

      {/* Workshop Grid Section */}
      <div className="workshop-grid-section">
        <h2 className="workshop-heading">Available Workshops</h2>
        <div className="workshop-grid">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card">
              <img src={workshop.image} alt={workshop.title} className="workshop-image" />
              <h3 className="workshop-title">{workshop.title}</h3>
              <p className="workshop-date">{workshop.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
