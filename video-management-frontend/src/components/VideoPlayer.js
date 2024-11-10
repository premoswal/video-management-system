import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoPath }) => {
  return (
    <div className="video-player">
      <h3>Video Playback</h3>
      <ReactPlayer url={videoPath} controls={true} width="100%" />
    </div>
  );
};

export default VideoPlayer;
