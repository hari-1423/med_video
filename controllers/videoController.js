const Video = require('../models/Video');

// Fetch videos with pagination and optional search functionality
exports.getVideos = async (req, res) => {
  try {
    const { search = '', page = 1 } = req.query;  // Extract search and page parameters
    const limit = 12;  // Set videos per page
    const skip = (page - 1) * limit;  // Calculate number of documents to skip

    // Construct the query to filter videos based on title or description
    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },  // Case-insensitive match for title
        { description: { $regex: search, $options: 'i' } }  // Case-insensitive match for description
      ]
    };

    // Get total count of matching documents for pagination
    const totalVideos = await Video.countDocuments(query);
    const totalPages = Math.ceil(totalVideos / limit);

    // Fetch videos matching the query with pagination
    const videos = await Video.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({
      videos,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
