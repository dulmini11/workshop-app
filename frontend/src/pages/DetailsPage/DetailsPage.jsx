import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../../data/workshops.json'; 
import './DetailsPage.css';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiTag } from 'react-icons/fi';

const DetailsPage = () => { 
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const status = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(status === 'true');
  }, []);
  
  const workshop = workshopsData.workshops.find(w => w.id === parseInt(id));
  const registeredWorkshopIds = JSON.parse(localStorage.getItem('registeredWorkshops') || '[]');
  const isAlreadyRegistered = workshop && registeredWorkshopIds.includes(workshop.id);

  // Handle back to home navigation
  const handleBackToHome = () => {
    navigate('/');
  };

  const handleAddReviewClick = () => {
  if (!isLoggedIn) {
    navigate('/loginRegister');
  } else {
    navigate(`/add-review/${workshop.id}`);
  }
  };

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
    navigate('/loginRegister');
    return;
  }

    let updatedIds;
    if (isAlreadyRegistered) {
      updatedIds = registeredWorkshopIds.filter(workshopId => workshopId !== workshop.id);
    } else {
      updatedIds = [...registeredWorkshopIds, workshop.id];
    }

    localStorage.setItem('registeredWorkshops', JSON.stringify(updatedIds));
    window.location.reload(); // Or use state update instead of reload for better UX
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  if (!workshop) {
    return (
      <div className="details-page">
        <div className="page-header">
          <button className="back-button" onClick={handleBackToHome}>
            ← Back to Workshops
          </button>
          <h1>Workshop Not Found</h1>
        </div>
        <div className="error-message">
          <p>The requested workshop could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page"> 
      <div className="page-header">
        <h1>{workshop.title}</h1>
      </div>

      <div className="workshops-container">
        <div className="workshop-card-2">
          <div className="workshop-content">
            <div className="workshop-info">
              <div className="workshop-meta">
                <span className="category"><FiTag /> {workshop.category}</span>
                <span className="date"><FiCalendar /> {workshop.date}</span>
                <span className="time"><FiClock /> {workshop.startTime} - {workshop.endTime}</span>
                <span className="place"><FiMapPin /> {workshop.place}</span>
                <span className="organizer"><FiUser /> Organized by {workshop.organizer}</span>
              </div>
              <p className="workshop-description">{workshop.description}</p>
              <div className="workshop-tags">
                {workshop.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <button className="register-button" onClick={handleRegisterClick}>
                {isLoggedIn
                  ? (isAlreadyRegistered ? 'Unregister' : 'Register Now')
                  : 'Register Now'}
              </button>
            </div>
            <div className="workshop-image-2">
              <img src={workshop.image} alt={workshop.title} />
            </div>
          </div>
          <h2 className="contact-title">Contact Details</h2>
          <div className="map-and-contact">
            {/* Map iframe */}
            {workshop.map && (
              <div className="workshop-map" style={{ marginTop: '10px' }}>
                <iframe
                  src={workshop.map}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${workshop.title}`}
                ></iframe>
              </div>
            )}

            {/* Contact Info */}
            <div className="workshop-contact">
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <h4>Phone Number</h4>
                  <p>{workshop.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email Address</h4>
                  <p>{workshop.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <div>
                  <h4>WhatsApp</h4>
                  <p>{workshop.whatsapp}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <p>{workshop.place}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="workshop-reviews">
            <h3>Reviews</h3>
            <div className="reviews-container">
              {workshop.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <strong>{review.user}</strong>
                    <span className="review-rating">⭐ {review.rating}</span>
                  </div>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
            <button className="add-review-btn" onClick={handleAddReviewClick}>
              Add Your Review
            </button>
          </div>
        </div>
      </div>

      <div className="button-group-2">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Workshops
        </button>
      </div>
    </div> 
  ); 
};

export default DetailsPage;
