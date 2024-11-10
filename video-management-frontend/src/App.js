import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import './App.css';

const App = () => {
  // The state for videos is managed in the parent component
  const [videos, setVideos] = useState([]);

  // Fetch videos when the component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data); // Update the state with video list
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos(); // Call fetchVideos when component loads
  }, []);

  return (
    <div className="App">
      <h1>Video Management System</h1>
      <VideoUpload setVideos={setVideos} /> {/* Pass setVideos to VideoUpload */}
      <VideoList videos={videos} setVideos={setVideos} /> {/* Pass setVideos to VideoList */}
    </div>
  );
};

export default App;
