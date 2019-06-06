const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Counter = new mongoose.Schema({
    _id: String,
    seq: { type: Number, required: true },
});


const Counters = mongoose.model('Counter', Counter);


// await new Counters({

//     _id: 'userId',
//     seq: 0,

// });
// await new Counters({

//     _id: 'candidateId',
//     seq: 0,

// });


async function getNextCount(name) {
    console.log(name)
    const ret = await Counters.findByIdAndUpdate({ _id: name },
        { $inc: { seq: 1 } }
    );
    if (!ret) return console.log('no record created')
    console.log(ret)
    return ret.seq;
}

module.exports = { getNextCount }