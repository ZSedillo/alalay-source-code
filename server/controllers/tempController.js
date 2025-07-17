// controllers/tempController.js
const Temp = require('../models/TempModel');

const getAllTempDocuments = async () => {
    try {
        const docs = await Temp.find();
        return docs;
    } catch (err) {
        throw new Error('Error fetching temp documents: ' + err.message);
    }
};

module.exports = { getAllTempDocuments };
