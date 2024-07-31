const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/photo_review_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Review Schema and Model
const ReviewSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    reviewText: String,
});

const Review = mongoose.model('Review', ReviewSchema);

// Photo Schema and Model
const PhotoSchema = new mongoose.Schema({
    url: String,
    description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Routes for Reviews
app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/reviews', async (req, res) => {
    const review = new Review(req.body);
    try {
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Routes for Photos
app.get('/photos', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/photos', async (req, res) => {
    const photo = new Photo(req.body);
    try {
        const savedPhoto = await photo.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
