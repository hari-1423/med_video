const Video = require('../models/Video');

// Fetch videos with pagination
exports.getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;  // Pagination parameters
    const videos = await Video.find()
      .sort({ publishedAt: -1 })  // Sort by most recent
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total document count
    const count = await Video.countDocuments();

    res.json({
      videos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
