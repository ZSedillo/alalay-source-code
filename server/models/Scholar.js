const mongoose = require('mongoose');

const ScholarSchema = new mongoose.Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    gpa: Number,
    userLevel:String,
    image_url: String,
    created_at: { type: Date, default: Date.now },
});

const Scholar = mongoose.model('Scholar', ScholarSchema);

module.exports = Scholar;
