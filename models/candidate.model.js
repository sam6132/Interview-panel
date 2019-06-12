const mongoose = require('mongoose');

const CandidateShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    status: { type: String },
    rounds: [{
        title: String,
        comment: String,
        qualified: Boolean,
    }],
    team: {
        type: mongoose.Schema.Types.ObjectId
    },
    skills: [String]

})

const candidates = mongoose.model('Candidate', CandidateShema)



module.exports = { candidates };

