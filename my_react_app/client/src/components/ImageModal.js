// src/components/ImageModal.js
import React from 'react';
import './ImageModal.css';

const ImageModal = ({ url, description, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={url} alt={description} className="modal-image" />
                <p>{description}</p>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ImageModal;
