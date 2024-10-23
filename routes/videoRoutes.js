const express = require('express');
const router = express.Router();
const { getVideos } = require('../controllers/videoController');

// Route to get videos with pagination
router.get('/videos', getVideos);

module.exports = router;
