// server.js
const connectDB = require('./config/db');
const { getAllTempDocuments } = require('./controllers/tempController');

const startServer = async () => {
    await connectDB();

    try {
        const documents = await getAllTempDocuments();
        documents.forEach(doc => console.log(doc));
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};

startServer();
