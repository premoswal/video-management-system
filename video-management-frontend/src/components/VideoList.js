import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';

const VideoList = ({ videos, setVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

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
  

  return (
    <div className="video-list">
      <h2>Available Videos</h2>
      {videos.length > 0 ? (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <span onClick={() => setSelectedVideo(video)}>{video.title}</span>
              <button onClick={() => deleteVideo(video._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No videos available</p>
      )}
      {selectedVideo && (
        <div>
          <p>Playing: {selectedVideo.title}</p>
          <VideoPlayer videoPath={`http://localhost:5000/${selectedVideo.path}`} />
        </div>
      )}
    </div>
  );
};

export default VideoList;
