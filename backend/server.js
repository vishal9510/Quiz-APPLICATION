const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());



// Import routes
const quizRoutes = require('./routes/quizRoutes');
const userResponseRoutes = require('./routes/userResponseRoutes');



// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/responses', userResponseRoutes);

// Centralized Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'An internal server error occurred',
        message: err.message
    });
});



// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

