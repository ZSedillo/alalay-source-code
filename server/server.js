// // server.js
// require('dotenv').config();

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const connectDB = require('./config/db');

// // Load env
// dotenv.config();

// // Create app
// const app = express();

// // Connect DB
// connectDB();

// // Middleware
// app.use(helmet());
// app.use(express.json());

// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true,
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // Routes
// const tempRoutes = require('./routes/tempRoutes');
// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes'); // Updated from scholarRoutes

// app.use('/temp', tempRoutes);
// app.use('/user', userRoutes);
// app.use('/posts', postRoutes); // New posts route

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// server.js - Debug version to find the problematic route
// server.js - Step by step debugging
require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

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

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

console.log('✅ Basic middleware setup complete');

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server basic setup working!' });
});

console.log('✅ Test route added');

// COMMENT OUT ALL ROUTES FIRST - then uncomment one by one
console.log('📝 Loading routes...');

// Step 1: Try tempRoutes first
try {
  console.log('🔍 Attempting to load tempRoutes...');
  const tempRoutes = require('./routes/tempRoutes');
  app.use('/temp', tempRoutes);
  console.log('✅ tempRoutes loaded successfully');
} catch (error) {
  console.log('❌ ERROR in tempRoutes:', error.message);
  console.log('   This is likely where the problem is!');
}

// Step 2: If tempRoutes works, try userRoutes
// UNCOMMENT ONLY AFTER tempRoutes works
/*
try {
  console.log('🔍 Attempting to load userRoutes...');
  const userRoutes = require('./routes/userRoutes');
  app.use('/user', userRoutes);
  console.log('✅ userRoutes loaded successfully');
} catch (error) {
  console.log('❌ ERROR in userRoutes:', error.message);
}
*/

// Step 3: If userRoutes works, try postRoutes
// UNCOMMENT ONLY AFTER userRoutes works
/*
try {
  console.log('🔍 Attempting to load postRoutes...');
  const postRoutes = require('./routes/postRoutes');
  app.use('/posts', postRoutes);
  console.log('✅ postRoutes loaded successfully');
} catch (error) {
  console.log('❌ ERROR in postRoutes:', error.message);
}
*/

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