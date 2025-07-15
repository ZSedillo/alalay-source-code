const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function main() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db("AlalayApp"); // Make sure this matches your DB name
        const tempCollection = db.collection("Temp");

        // Fetch all documents
        const documents = await tempCollection.find({}).toArray();

        // Output each document
        documents.forEach(doc => {
            console.log(doc);
        });

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await client.close();
    }
}

main();
