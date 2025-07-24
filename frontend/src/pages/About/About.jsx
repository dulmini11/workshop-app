import React, { useEffect, useState } from 'react';
import './About.css'; 

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement to create dynamic background gradient
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.addEventListener('mousemove', handleMouseMove);
      return () => aboutSection.removeEventListener('mousemove', handleMouseMove);
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
    <div className="about-section" style={gradientStyle}>
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      <div className="about-content">
        <h1>Welcome to WorkshopX — Your Gateway to Lifelong Learning</h1>
        <p>
        WorkshopX is an all-in-one platform designed to help people of all ages explore, register for, and engage with a wide range of workshops. Whether you're looking to learn a new skill, improve your knowledge, or connect with a like-minded community of learners — this is the place for you.
        </p>

        <p>
        Ignite your curiosity, expand your horizons, and unlock new possibilities. From creative arts and tech innovation to personal development and wellness, WorkshopX empowers you to carve your own learning journey. Every workshop is a chance to discover something new, boost your confidence, and turn your interests into real-world skills.
        </p>

        <p>
        Whether you're a student shaping your future, a professional leveling up your career, or simply someone hungry for growth — WorkshopX is your stepping stone to lifelong learning. Explore your path, gain skills, and grow beyond limits — one workshop at a time.
        </p>

        <h2>🔍 Key Features:</h2>
        <ol>
            <li><strong>Smart Browsing:</strong> Effortlessly search, filter, and sort workshops using local data.</li>
            <li><strong>Workshop Insights:</strong> Get full details including date, location, tags, organizers, and real-time feedback from users.</li>
            <li><strong>Easy Participation:</strong> Register or unregister with a click — your choices are saved locally.</li>
            <li><strong>My Dashboard:</strong> View your registered workshops and feedback in one personalized space.</li>
        </ol>

        <p>
            Whether you're a student, a working professional, or simply a curious learner — WorkshopX helps you stay connected with knowledge and growth opportunities around you.
        </p>
     </div>
    </div>
  );
};

export default About;
