const { getAllTempDocuments } = require('../models/TempModel.js');

async function fetchAndLogTempDocs() {
    try {
        const documents = await getAllTempDocuments();
        documents.forEach(doc => console.log(doc));
    } catch (err) {
        console.error("Error in Controller:", err);
    }
}

module.exports = { fetchAndLogTempDocs };
