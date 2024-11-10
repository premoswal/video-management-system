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
const deleteVideo = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/videos/${id}`);
    
    // Log the response to see its content
    console.log('Delete response:', response);

    // Confirm if the deletion was successful based on status or message
    if (response.status === 200 && response.data.message === 'Video deleted successfully') {
      const updatedVideos = videos.filter(video => video._id !== id);
      setVideos(updatedVideos);
      alert('Video deleted successfully');

      if (selectedVideo && selectedVideo._id === id) {
        setSelectedVideo(null);
      }
    } else {
      throw new Error('Deletion not confirmed');
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    alert('Failed to delete video');
  }
};

