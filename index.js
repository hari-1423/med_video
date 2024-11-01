const express = require('express');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    next(); // Proceed to the next middleware/route handler
});

// Root route (this should be placed before other routes)
app.get('/', (req, res) => {
    res.send('Server and MongoDB are connected!');
});

// API Routes
app.use('/api', videoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
