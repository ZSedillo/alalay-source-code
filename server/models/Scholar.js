const mongoose = require('mongoose');

const ScholarSchema = new mongoose.Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    gpa: Number,
    userLevel:String,
    image_url: String,
});

const Scholar = mongoose.model('Scholar', ScholarSchema);

module.exports = Scholar;
