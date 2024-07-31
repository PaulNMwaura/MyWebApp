// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PhotoUploadForm from './PhotoUploadForm';
import ImageModal from './ImageModal';
import './HomePage.css';

const HomePage = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/photos');
            setPhotos(response.data);
        } catch (err) {
            console.error('Error fetching photos:', err);
        }
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className="homepage">
            <h1>Photo Gallery</h1>
            <PhotoUploadForm onUploadSuccess={fetchPhotos} />
            <div className="photo-gallery">
                {photos.map((photo) => (
                    <img
                        key={photo._id}
                        src={photo.url}
                        alt={photo.description}
                        className="photo"
                        onClick={() => handlePhotoClick(photo)}
                    />
                ))}
            </div>
            <Link to="/reviews" className="review-link">Go to Reviews</Link>
            {selectedPhoto && (
                <ImageModal
                    url={selectedPhoto.url}
                    description={selectedPhoto.description}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default HomePage;
