const connectDB = require('./config/db');
const { getAllTempDocuments } = require('./controllers/tempController');

const startServer = async () => {
    console.log("🚀 Starting server...");
    try {
        await connectDB();
        console.log('✅ MongoDB Connected');

        const documents = await getAllTempDocuments();
        console.log("📄 Documents fetched:", documents);

        if (!documents.length) {
            console.log("⚠️ No documents found in the 'temps' collection.");
        } else {
            documents.forEach(doc => console.log(doc));
        }

    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

startServer();
