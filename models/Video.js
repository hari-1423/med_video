const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Video', videoSchema);
