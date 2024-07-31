// src/components/ReviewPage.js
import React, { useState, useCallback } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import '../App.css'; // Import global CSS

const ReviewPage = () => {
    const [refreshReviews, setRefreshReviews] = useState(false);

    const handleReviewSubmit = useCallback(() => {
        setRefreshReviews((prev) => !prev);
    }, []);

    return (
        <div className="ReviewPage">
            <h1>Reviews</h1>
            <ReviewForm onReviewSubmit={handleReviewSubmit} />
            <ReviewList refreshReviews={refreshReviews} />
        </div>
    );
};

export default ReviewPage;
