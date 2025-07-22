import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // <-- import Link
import './Navbar.css';
// import logo from '../../assets/herocar.jpg';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <div className="navbar-brand">
          <a href="/" className="brand-link">
            {/* <img src={logo} alt="CarX Logo" className="navbar-logo" /> */}
            <span className="brand-name">WorkshopsX</span>
          </a>
        </div>

        {/* Navigation Links and User Icon */}
        <div className="navbar-right">
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/workshop" className="nav-link" onClick={() => setIsMenuOpen(false)}>workshop</a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
              </li>
            </ul>
          </div>

          {/* User Icon */}
          <div className="navbar-user">
            <Link to="/profile" className="user-link" onClick={closeMenu}>
              <svg className="user-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`toggle-bar ${isMenuOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;