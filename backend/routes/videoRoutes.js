const express = require('express');

const router = express.Router();
const { upload, uploadVideo, getVideos } = require('../controllers/videoController');

router.post('/upload', upload.single('video'), uploadVideo);
router.get('/', getVideos);

module.exports = router;
