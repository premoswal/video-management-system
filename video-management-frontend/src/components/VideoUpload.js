import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = ({ setVideos }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setMessage('Upload successful!');
        // After upload, fetch the latest list of videos
        const videoListResponse = await axios.get('http://localhost:5000/api/videos');
        setVideos(videoListResponse.data); // Update the video list in parent component
      } else {
        setMessage('Upload failed. Please try again.');
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      setMessage('Upload failed. Please try again.');
      console.error('Upload error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="video-upload">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoUpload;
