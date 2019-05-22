const express = require('express');
const router = express.Router();
const { candidates } = require('../models/candidate.model');



// bussiness router is express router
router.route('/add').post(async (req, res) => {


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
        res.status(400).send("unable to save data to database")

    })
});

// displaying get data 
router.route('/').get(async (req, res) => {
    const candidate = await candidates.find().sort('name');
    res.send(candidate);

})



// Define getbyid 
router.route('/:id').get((req, res) => {
    let id = req.params.id;
    candidates.findById(id, (err, candidate) => {
        res.json({
            success: true,
            candidate
        });
    })
})




router.put('/edit/:id', async (req, res) => {
    const candidate = await candidates.findOne({ _id: req.params.id });

    candidate.rounds.push(req.body)

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



// defined the delete route 
router.route('/delete/:id').get((req, res) => {
    candidates.findByIdAndRemove({ _id: req.params.id }, (err, candidate) => {
        if (err) res.json(err);
        else res.json('Succesfully removed');
    })
})

module.exports = router;