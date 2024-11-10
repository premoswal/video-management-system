const Video = require('../models/videoModel');
const multer = require('multer');
const path = require('path');
const produceEvent = require('../kafka/producer');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


// const uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     console.log('Video uploaded to:', videoFile.path);  // Log the path for debugging

//     const { originalname, filename } = req.file;
//     const newVideo = new Video({ title: originalname, path: `uploads/${filename}` });
//     await newVideo.save();

//     // Send event to Kafka (make sure this doesn't throw an error)
//     await produceEvent('video-uploads', { videoId: newVideo._id, title: originalname });

//     // Send a success response
//     res.status(201).json({ message: 'Upload successful!', video: newVideo });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Server error during upload' });
//   }
// };
const uploadVideo = async (req, res) => {
  try {
    console.log('File received:', req.file); // Log the uploaded file details

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, filename } = req.file;
    const newVideo = new Video({ title: originalname, path: `uploads/${filename}` });
    await newVideo.save();

    console.log('Video saved to database:', newVideo); // Log the saved video details

    // Send event to Kafka (optional)
    try {
      await produceEvent('video-uploads', { videoId: newVideo._id, title: originalname });
    } catch (kafkaError) {
      console.error('Kafka event failed:', kafkaError); // Log Kafka-related errors
    }

    // Send a success response
    res.status(201).json({ message: 'Upload successful!', video: newVideo });
  } catch (err) {
    console.error('Upload error:', err); // Log the error
    res.status(500).json({ error: 'Server error during upload' });
  }
};


const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { upload, uploadVideo, getVideos };
