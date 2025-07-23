import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Edit2, Save, X } from 'lucide-react';
import mockUsers from '../../data/mockUsers.json';
import workshopsData from '../../data/workshops.json';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';

function UserDetails({ setIsLoggedIn }) {
  // User data state, initialized from localStorage or fallback to mockUsers
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

  // Registered workshops state
  const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
  const [ownReviews, setOwnReviews] = useState([]);

  const navigate = useNavigate();

  // Save userData to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  // Load registered workshops from localStorage on mount
  // Load own reviews from localStorage
useEffect(() => {
  const registeredIds = JSON.parse(localStorage.getItem('registeredWorkshops') || '[]');
  const filtered = workshopsData.workshops.filter(workshop =>
    registeredIds.includes(workshop.id)
  );
  setRegisteredWorkshops(filtered);

  const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
  const userReviews = [];

  Object.keys(allReviews).forEach(workshopId => {
    allReviews[workshopId].forEach(review => {
      if (review.user === userData.username) {
        userReviews.push({
          ...review,
          workshopId,
          workshop: workshopsData.workshops.find(w => w.id === workshopId)
        });
      }
    });
  });

  setOwnReviews(userReviews);
}, [userData.username]);


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

  const handleViewMore = (workshopId) => {
    navigate(`/workshop/${workshopId}`);
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
      <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      <h2 className="section-title">Account Settings</h2>
      <div className="header-section">
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

      <h2 className="section-title">My Dashboard</h2>
      <div className="dashboard-section">
        <div className="dashboard-container">
          <h2 className="workshop-title">Registered Workshops</h2>
          {registeredWorkshops.length === 0 ? (
            <p className="workshop-date">You have not registered for any workshops yet.</p>
          ) : (
            <div className="registered-workshops-row">
              {registeredWorkshops.map((workshop) => (
                <div key={workshop.id} className="workshop-card-3">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="workshop-image"
                  />
                  <h3 className="workshop-title">{workshop.title}</h3>
                  <p className="workshop-date">{workshop.date}</p>
                  <p className="workshop-place">{workshop.place}</p>
                  <button
                    className="view-more-button"
                    onClick={() => handleViewMore(workshop.id)}
                  >
                    View More →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right Side - Registered Workshops */}
        <div className="dashboard-reviews">
          <h2 className="workshop-title">Own Reviews</h2>
        <div className="reviews-container">
        {ownReviews.length === 0 ? (
          <p>You have not submitted any reviews yet.</p>
        ) : (
          ownReviews.map((review, index) => (
            <div key={index} className="review-item">
              <h4>{review.workshop?.title}</h4>
              <p><strong>Rating:</strong> {review.rating} ⭐</p>
              <p>{review.review}</p>
            </div>
          ))
        )}
      </div>
      </div>
      </div>
      </div>
  );
}

export default UserDetails;