// controllers/tempController.js
const Temp = require('../models/TempModel');

const getAllTempDocuments = async () => {
    try {
        return await Temp.find();
    } catch (err) {
        throw new Error('Error fetching temp documents: ' + err.message);
    }
};

module.exports = { getAllTempDocuments };
