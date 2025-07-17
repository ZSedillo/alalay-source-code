const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://root:1234@alalay.yt6coul.mongodb.net/';
        
        const conn = await mongoose.connect(uri, {
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
