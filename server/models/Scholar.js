const mongoose = require('mongoose');

const ScholarSchema = new mongoose.Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    age: Number,
});

const Scholar = mongoose.model('Scholar', ScholarSchema);

module.exports = Scholar;
