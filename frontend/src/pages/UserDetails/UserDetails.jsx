import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';

function UserDetails({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="user-details-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="user-details-title">Account Setting</h1>

      <div className="container-box">
        {/* Content */}<p>bbgg</p>
      </div>

      <h1 className="user-details-title">My Dashboard</h1>

      <div className="container-box">
        {/* Content */}
      </div>
    </div>
  );
}

export default UserDetails;
