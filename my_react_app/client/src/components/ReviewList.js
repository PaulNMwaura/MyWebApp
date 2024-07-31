// src/components/ReviewList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the global CSS file or CSS module

const ReviewList = ({ refreshReviews }) => {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews from the database when the component mounts or refreshReviews changes
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/reviews');
                setReviews(response.data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };
        fetchReviews();
    }, [refreshReviews]); // Dependency array includes refreshReviews

    const renderStars = (rating) => {
        return [...Array(5)].map((star, index) => {
            return (
                <span key={index} className={index < rating ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        });
    };

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="review">
                    <p className="username">{review.username}</p>
                    <div className="rating">
                        {renderStars(review.rating)}
                    </div>
                    <p className="reviewText">{review.reviewText}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
