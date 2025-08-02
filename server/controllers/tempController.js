const Temp = require('../models/TempModel');

// @desc    Get all temp documents
const getAllTempDocuments = async (req, res) => {
  console.log('➡️ /temp endpoint hit');
  try {
    const temps = await Temp.find();
    console.log('📦 Temp documents:', temps);
    res.json(temps);
  } catch (err) {
    console.error('❌ Error fetching temps:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllTempDocuments };
