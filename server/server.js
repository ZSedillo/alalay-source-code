const Temp = require('./models/TempModel'); // import the model

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ MongoDB Connected');

        // Insert test document
        await Temp.create({ username: 'TestUser', age: 25 });
        console.log('🆕 Test document added.');

        // Fetch and print all
        const documents = await Temp.find();
        console.log("📄 Fetched Documents:");
        documents.forEach(doc => console.log(doc));

    } catch (err) {
        console.error("❌ Error:", err.message);
    }
};
