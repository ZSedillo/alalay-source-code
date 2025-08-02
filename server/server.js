// server.js
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

// Routes
const tempRoutes = require('./routes/tempRoutes');
const userRoutes = require('./routes/userRoutes');
const scholarRoutes = require('./routes/scholarRoutes');

app.use('/temp', tempRoutes);
app.use('/user', userRoutes);
app.use('/scholar', scholarRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
