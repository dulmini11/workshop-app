import React from 'react' 
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../../data/workshops.json'; 
import './DetailsPage.css';

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
        </div>
      </div>
      <button className="back-button" onClick={handleBackToHome}>
          ← Back to Workshops
        </button>
    </div> 
  ) 
} 
 
export default DetailsPage