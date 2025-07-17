// const { getAllTempDocuments } = require('../models/TempModel.js');

// async function fetchAndLogTempDocs() {
//     try {
//         const documents = await getAllTempDocuments();
//         documents.forEach(doc => console.log(doc));
//     } catch (err) {
//         console.error("Error in Controller:", err);
//     }
// }

// module.exports = { fetchAndLogTempDocs };

const { getAllTempDocuments } = require('../models/TempModel.js');

async function fetchAndLogTempDocs() {
    try {
        console.log("Fetching documents...");
        const documents = await getAllTempDocuments();

        console.log("Documents fetched:", documents.length);

        if (documents.length === 0) {
            console.log("No documents found in the Temp collection.");
            return;
        }

        documents.forEach(doc => {
            const id = doc._id.toString();
            const name = doc.username || doc.name || 'No Name';
            const age = doc.age || 'Unknown';

            console.log(`ID: ${id}`);
            console.log(`Name: ${name}`);
            console.log(`Age: ${age}`);
            console.log('-----------------------------');
        });

    } catch (err) {
        console.error("Error in Controller:", err);
    }
}

module.exports = { fetchAndLogTempDocs };

