import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Edit2, Save, X } from 'lucide-react';
import mockUsers from '../../data/mockUsers.json';
import './UserDetails.css';

function UserDetails({ setIsLoggedIn }) {
  // Initialize user data from localStorage or fallback to mockUsers
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      username: mockUsers[0]?.username || "domy",
      password: mockUsers[0]?.password || "1234",
      email: mockUsers[0]?.email || "domy@example.com",
      profilePicture: mockUsers[0]?.profilePicture || null
    };
  });
  
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const [isEditing, setIsEditing] = useState({
    username: false,
    password: false,
    email: false
  });
  
  const [editValues, setEditValues] = useState({
    username: userData.username,
    password: userData.password,
    email: userData.email
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
    setEditValues(prev => ({ ...prev, [field]: userData[field] }));
  };

  const handleSave = (field) => {
    setUserData(prev => ({ ...prev, [field]: editValues[field] }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field) => {
    setEditValues(prev => ({ ...prev, [field]: userData[field] }));
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleInputChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileField = ({ field, icon: Icon, label, type = "text", isPassword = false }) => (
    <div className="profile-field">
      <div className="field-header">
        <Icon className="field-icon" size={20} />
        <label className="field-label">{label}</label>
      </div>
      <div className="field-content">
        {isEditing[field] ? (
          <div className="edit-mode">
            <input
              type={type}
              value={editValues[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="edit-input"
              autoFocus
            />
            <div className="edit-buttons">
              <button
                onClick={() => handleSave(field)}
                className="save-btn"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => handleCancel(field)}
                className="cancel-btn"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <span className="field-value">
              {isPassword ? '••••••••' : userData[field]}
            </span>
            <button
              onClick={() => handleEdit(field)}
              className="edit-btn"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="user-details-container">
      <div className="header-section">
        <h1 className="section-title">Account Settings</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="account-settings-box row-layout">
        {/* Left: Profile Picture */}
        <div className="left-side">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <div className="profile-picture-placeholder">
                  <User size={48} />
                </div>
              )}
              <label htmlFor="profile-upload" className="profile-upload-btn">
                <Camera size={16} />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Right: Profile Fields */}
        <div className="right-side">
          <div className="profile-fields">
            <ProfileField field="username" icon={User} label="Username" />
            <ProfileField field="email" icon={Mail} label="Email Address" type="email" />
            <ProfileField field="password" icon={Lock} label="Password" type="password" isPassword={true} />
          </div>
        </div>
      </div>


      <div className="dashboard-section">
        <h2 className="section-title">My Dashboard</h2>
        <div className="dashboard-box">
          <p>Dashboard content will go here...</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;