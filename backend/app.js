require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');
const path = require('path');
const Video = require('./models/videoModel'); // Assuming you have a Video model for MongoDB
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

const cors = require('cors');
app.use(cors());

// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/videos', videoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Delete Video Route
// Backend: Express delete route for video
app.delete('/api/videos/:id', async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findByIdAndDelete(videoId); // Mongoose delete by ID

    if (video) {
      res.status(200).json({ message: 'Video deleted successfully' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


