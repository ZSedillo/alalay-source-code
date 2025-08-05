const express = require('express');
const router = express.Router();
const { getAllTempDocuments } = require('./temp.controller');

// @route   GET /temp
// @desc    Get all temp documents
router.get('/', getAllTempDocuments);

module.exports = router;
