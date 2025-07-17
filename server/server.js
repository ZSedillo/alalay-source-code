const connectDB = require('./config/db');
const { getAllTempDocuments } = require('./controllers/tempController');

const startServer = async () => {
    console.log("🚀 Starting server...");
    try {
        await connectDB();
        console.log('✅ MongoDB Connected');

        const documents = await getAllTempDocuments();
        console.log("📄 Documents fetched:", documents);
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

startServer();
