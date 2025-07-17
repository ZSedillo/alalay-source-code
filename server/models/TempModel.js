const connectDB = require('../config/db.js');

async function getAllTempDocuments() {
    const db = await connectDB();
    const tempCollection = db.collection("Temp");
    return tempCollection.find({}).toArray();
}

module.exports = { getAllTempDocuments };
