const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Temp = mongoose.model('Temp', TempSchema);

module.exports = Temp;
