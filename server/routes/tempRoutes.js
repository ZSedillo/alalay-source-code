const express = require('express');
const router = express.Router();
const { getAllTempDocuments } = require('../controllers/tempController');

// @route   GET /temp
// @desc    Get all temp documents
router.get('/', getAllTempDocuments);

module.exports = router;
