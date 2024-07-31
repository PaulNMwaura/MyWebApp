// src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import global CSS

const ReviewForm = ({ onReviewSubmit }) => {
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/reviews', {
                username,
                rating,
                reviewText,
            });
            // Clear the form fields
            setUsername('');
            setRating(0);
            setReviewText('');
            // Notify the parent component to refresh the reviews
            onReviewSubmit();
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <div className="star-rating">
                {[...Array(5)].map((star, index) => (
                    <span
                        key={index}
                        className={index < rating ? 'star filled' : 'star'}
                        onClick={() => handleStarClick(index)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                placeholder="Write your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
            ></textarea>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
