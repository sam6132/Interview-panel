const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const QuestinsShema = new mongoose.Schema({
    title: String,
    questions: {
        type: String
    }
});


const Questions = mongoose.model('Question', QuestinsShema);


module.exports = { Questions };