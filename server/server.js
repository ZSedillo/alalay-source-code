require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Load env
dotenv.config();

// Create app
const app = express();

console.log('🔧 Starting server setup...');

// Connect DB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

//Disable rate limiting for debugging
// app.use(limiter);

console.log('✅ Basic middleware setup complete');

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server basic setup working!' });
});

const tempRoutes = require('./temp/temp.routes');
app.use('/temp', tempRoutes);
const userRoutes = require('./user/user.routes');
app.use('/user', userRoutes);
const postRoutes = require('./post/post.routes');
app.use('/posts', postRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Test at: http://localhost:${PORT}/test`);
});