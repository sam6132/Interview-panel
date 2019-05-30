const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { candidates } = require('../models/candidate.model');



// bussiness router is express router
router.post('/add', auth, async (req, res) => {


    let candidate = await candidates.findOne({
        email: req.body.email
    });

    if (candidate) {
        return res.json({
            success: false,
            message: 'Candidate alredy attended Interview'
        });
    }

    interview = new candidates(req.body);

    interview.save().then((candidate) => {
        res.status(200).json({
            success: true,
            candidate
        })

    }).catch(err => {
        res.status(400).send(err.message)

    })
});

// displaying get data 
router.get('/', auth, async (req, res) => {
    const candidate = await candidates.find();
    res.send(candidate);

})



// Define getbyid 
router.get('/edit/:id', auth, async (req, res) => {
    let id = req.params.id;
    candidates.findById(id, (err, candidate) => {
        res.json({
            candidate
        });
    })
})


// define update id 

router.post('/update/:id', auth, async (req, res) => {
    const candidate = await candidates.findOneAndUpdate({ _id: req.params.id }, {
        '$set': req.body
    });


    try {
        await candidate.save();

        res.json({
            success: true,
            candidate,
            message: 'Updated Sucessfully'
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: 'Updated Failed' + err.messages
        });
    }

});

router.post('/add-review/:id', auth, async (req, res) => {
    const candidate = await candidates.findOne({ _id: req.params.id });

    candidate.rounds.push(req.body);

    try {
        await candidate.save();

        res.json({
            success: true,
            candidate,
            message: 'Updated Sucessfully'
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: 'Updated Failed' + err.messages
        });
    }


})

router.get('/getReview/:r_id', auth, async (req, res) => {

    const r_id = req.params.r_id
    const candidate = await candidates.findOne({ 'rounds': { $elemMatch: { _id: r_id } } });

    // const review = await candidate.rounds.findOne({ _id: r_id })
    res.send(candidate.rounds.id(r_id))
})

router.post('/editReview/:r_id', auth, async (req, res) => {
    const r_id = req.params.r_id


    console.log(req.body)
    const candidate = await candidates.findOneAndUpdate({ 'rounds._id': r_id }, {
        '$set': {
            'rounds.$': req.body
        }
    })
    await candidate.save()

    res.send(candidate)
})



// defined the delete route 
router.get('/delete/:id', auth, async (req, res) => {
    await candidates.findOneAndRemove({ _id: req.params.id }, async (err, result) => {

        res.send(result);
    });



})

module.exports = router;