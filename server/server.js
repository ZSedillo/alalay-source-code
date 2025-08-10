// require('dotenv').config();

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const connectDB = require('./config/db');
// const cookieParser = require('cookie-parser');

// // Load env
// dotenv.config();

// // Create app
// const app = express();
// app.use(cookieParser());

// console.log('🔧 Starting server setup...');

// // Connect DB
// connectDB();

// // Middleware
// app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true,
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// //Disable rate limiting for debugging
// // app.use(limiter);

// console.log('✅ Basic middleware setup complete');

// // Test route
// app.get('/test', (req, res) => {
//   res.json({ message: 'Server basic setup working!' });
// });

// const tempRoutes = require('./temp/temp.routes');
// app.use('/temp', tempRoutes);
// const userRoutes = require('./user/user.routes');
// app.use('/user', userRoutes);
// const postRoutes = require('./post/post.routes');
// app.use('/posts', postRoutes);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌐 Test at: http://localhost:${PORT}/test`);
// });

// server.js (or app.js - your main server file)
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

// STEP 1: Basic Security Middleware
app.use(helmet());

// STEP 2: CORS Configuration (BEFORE body parsing)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// STEP 3: Body Parsing Middleware (CRITICAL - MUST be before routes)
app.use(express.json({ 
  limit: '10mb',
  type: 'application/json'
}));
app.use(express.urlencoded({ 
  extended: true,
  limit: '10mb'
}));

// STEP 4: Cookie Parser
app.use(cookieParser());

// STEP 5: Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
// Disable rate limiting for debugging
// app.use(limiter);

// STEP 6: Debug Middleware (TEMPORARY - Remove in production)
app.use((req, res, next) => {
  console.log('🔍 Request Debug Info:');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Content-Type:', req.get('Content-Type'));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Body Keys:', Object.keys(req.body || {}));
  console.log('---');
  next();
});

console.log('✅ Basic middleware setup complete');

// STEP 7: Test Routes
app.get('/test', (req, res) => {
  res.json({ message: 'Server basic setup working!' });
});

// Test body parsing route
app.post('/test-body', (req, res) => {
  console.log('🧪 Test body received:', req.body);
  res.json({ 
    message: 'Body test successful',
    received: req.body,
    bodyExists: !!req.body,
    bodyKeys: Object.keys(req.body || {})
  });
});

// STEP 8: Application Routes (MUST come after body parsing middleware)
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

// Error handling middleware (should be last)
app.use((error, req, res, next) => {
  console.error('💥 Server Error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// 404 handler (should be last)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Test at: http://localhost:${PORT}/test`);
  console.log(`🧪 Test body parsing: POST http://localhost:${PORT}/test-body`);
});

module.exports = app;