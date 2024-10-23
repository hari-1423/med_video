const express = require('express');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route (this should be placed before other routes)
app.get('/', (req, res) => {
    res.send('Server and MongoDB are connected!');
});

// API Routes
app.use('/api', videoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
