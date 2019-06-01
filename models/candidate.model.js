const mongoose = require('mongoose');

const candidates = mongoose.model('Candidate', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    status: { type: String },
    rounds: [{
        title: String,
        comment: String,
        qualified: Boolean
    }]

}))

module.exports = { candidates };

