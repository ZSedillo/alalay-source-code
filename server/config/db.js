const { MongoClient } = require('mongodb');
require('dotenv').config({ path: __dirname + '/config.env' });

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("AlalayApp");
        return db;
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        throw err;
    }
}

module.exports = connectDB;
