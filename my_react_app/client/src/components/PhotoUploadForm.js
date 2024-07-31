// src/components/PhotoUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUploadForm.css';

const PhotoUploadForm = ({ onUploadSuccess }) => {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/photos', {
                url,
                description,
            });
            if (response.status === 201) {
                onUploadSuccess();
                setUrl('');
                setDescription('');
            }
        } catch (err) {
            console.error('Error uploading photo:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="photo-upload-form">
            <div>
                <label>Photo URL:</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Upload Photo</button>
        </form>
    );
};

export default PhotoUploadForm;
