const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' }); // Adjust path if needed

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
