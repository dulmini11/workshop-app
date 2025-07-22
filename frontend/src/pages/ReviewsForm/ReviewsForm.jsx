import React, { useState } from 'react';
import './ReviewsForm.css';

const ReviewsForm = ({ onSubmit }) => {
  const [user, setUser] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !review || rating < 1 || rating > 5) {
      alert('Please fill in all fields correctly');
      return;
    }

    const newReview = {
      user,
      review,
      rating,
    };

    onSubmit(newReview);

    // Reset form
    setUser('');
    setReview('');
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Submit Your Review</h4>
      <input
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Comment"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="submit-review-btn">Submit Review</button>
    </form>
  );
};

export default ReviewsForm;
