const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { candidates } = require('../models/candidate.model');



// bussiness router is express router
router.post('/add', async (req, res) => {


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
router.get('/', async (req, res) => {
    const candidate = await candidates.find().sort('name');
    res.send(candidate);

})



// Define getbyid 
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    candidates.findById(id, (err, candidate) => {
        res.json({
            candidate
        });
    })
})


// define update id 

router.post('/update/:id', async (req, res) => {
    candidates.findById(req.params.id, (err, can) => {
        if (!can) {
            res.status(404).send('data not found')
        }
        else {
            can.name = req.body.name;
            can.email = req.body.email;
            can.number = req.body.number;
            can.rounds = req.body.rounds;
            can.comments = req.body.comments;

            can.save().then(data => {
                res.json('update complete')
            })
                .catch(err => {
                    res.status(400).send(err.msg);
                })
        }

    });


});



// defined the delete route 
router.get('/delete/:id', (req, res) => {
    candidates.findByIdAndRemove({ _id: req.params.id }, (err, candidate) => {
        if (err) res.json(err);
        else res.json('Succesfully removed');
    })
})

module.exports = router;