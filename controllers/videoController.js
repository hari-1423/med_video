const Video = require('../models/Video');

// Fetch all videos with optional search functionality
exports.getVideos = async (req, res) => {
  try {
    const { search = '' } = req.query;  // Extract search parameter

    // Construct the query to filter videos based on title or description
    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },  // Case-insensitive match for title
        { description: { $regex: search, $options: 'i' } }  // Case-insensitive match for description
      ]
    };

    // Fetch all videos matching the query without pagination
    const videos = await Video.find(query).sort({ publishedAt: -1 }).exec();

    res.json({
      videos,
      totalPages: 1,  // All results on one page
      currentPage: 1,  // Current page is always 1 in this case
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
