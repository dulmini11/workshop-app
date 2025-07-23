import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewsForm.css';

const ReviewsForm = ({ onSubmit, workshopId = 'default-workshop' }) => {
  const [user, setUser] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submit clicked!');
    
    // Prevent double submission
    if (isSubmitting) return;
    
    // Validation
    if (!user.trim() || !review.trim() || rating < 1 || rating > 5) {
      alert('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        id: Date.now(), 
        user: user.trim(),
        review: review.trim(),
        rating: Number(rating),
        date: new Date().toISOString(),
        workshopId
      };

      console.log('New review:', newReview); // Debug log

      // Save to localStorage
      const stored = localStorage.getItem('reviews') || '{}';
      const parsed = JSON.parse(stored);
      const workshopReviews = parsed[workshopId] || [];
      parsed[workshopId] = [...workshopReviews, newReview];
      localStorage.setItem('reviews', JSON.stringify(parsed));

      console.log('Saved to localStorage:', parsed); // Debug log

      // Call parent's submit handler if provided
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit(newReview);
      }

      // Reset form
      setUser('');
      setReview('');
      setRating(1);

      // Show success message
      setSuccessMessage('Your review was submitted successfully!');
      console.log('Success message set'); // Debug log

      // Navigate to home after delay
      setTimeout(() => {
        console.log('Navigating to home...'); // Debug log
        setSuccessMessage('');
        setIsSubmitting(false);
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reviewContainer">
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            Redirecting to home page...
          </p>
        </div>
      )}
      
      {!successMessage && (
        <form onSubmit={handleSubmit} className="review-form">
          <h4>Submit Your Review</h4>
          
          <div className="form-group">
            <label htmlFor="user-name">Your Name *</label>
            <input
              id="user-name"
              type="text"
              placeholder="Enter your name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-text">Your Review *</label>
            <textarea
              id="review-text"
              placeholder="Type Your feedback"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              disabled={isSubmitting}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating-select">Rating *</label>
            <select 
              id="rating-select"
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              disabled={isSubmitting}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="submit-review-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewsForm;