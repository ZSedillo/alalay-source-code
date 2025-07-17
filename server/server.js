const connectDB = require('./config/db');
const { getAllTempDocuments } = require('./controllers/tempController');

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB Connected');

        const documents = await getAllTempDocuments();
        console.log("📄 Fetched Documents:");
        documents.forEach(doc => console.log(doc));
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

startServer();
