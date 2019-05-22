const mongoose = require('mongoose');

const candidates = mongoose.model('Candidate', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    rounds: []

}))

module.exports = { candidates };

