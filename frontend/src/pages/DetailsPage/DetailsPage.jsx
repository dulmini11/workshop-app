import React from 'react' 
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../../data/workshops.json'; 
import './DetailsPage.css';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const DetailsPage = () => { 
  const { id } = useParams(); // Get workshop ID from URL
  const navigate = useNavigate(); // For navigation
  
  // Find the specific workshop by ID (convert string to number)
  const workshop = workshopsData.workshops.find(w => w.id === parseInt(id));

  // Handle back to home navigation
  const handleBackToHome = () => {
    navigate('/');
  };

  // If workshop not found, show error message
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
        <h1>Workshop Details</h1>
      </div>
      
      <div className="workshops-container">
        <div className="workshop-card-2">
          <div className="workshop-content">
            <div className="workshop-info">
              <h2 className="workshop-title-2">{workshop.title}</h2>
              <div className="workshop-meta">
                <span className="category">{workshop.category}</span>
                <span className="date">{workshop.date}</span>
                <span className="time">{workshop.startTime} - {workshop.endTime}</span>
                <span className="place">{workshop.place}</span>
                <span className="organizer">Organized by {workshop.organizer}</span>
              </div>
              <p className="workshop-description">{workshop.description}</p>
              <div className="workshop-tags">
                {workshop.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="workshop-image-2">
              <img src={workshop.image} alt={workshop.title} />
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
          </div>

          <div className="map-and-contact">
            {/* Map iframe */}
            {workshop.map && (
              <div className="workshop-map">
                <iframe
                  src={workshop.map}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Workshop Location"
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

        </div>
      </div>

      <div className="button-group-2">
        <button className="register-button" onClick={handleBackToHome}>
          Register now
        </button>
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Workshops
        </button>
      </div>
    </div> 
  ); 
};

export default DetailsPage;
