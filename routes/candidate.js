const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const candidate = mongoose.model('Candidate', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    rounds: []

}))



// bussiness router is express router
router.route('/add').post(function (req, res) {
    let interview = new candidate(req.body);
    interview.save()

        .then((interview) => {
            res.status(200).json({ 'interview': 'interview details added succesfully' })

        }).catch(err => {
            res.status(400).send("unable to save data to database")

        })
});

// displaying get data 
router.route('/').get((req, res) => {
    candidate.find((err, interview) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(interview)
        }

    })

})



// Define getbyid 
router.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    candidate.findById(id, (err, interviewbyid) => {
        res.json(interviewbyid);
    })
})


// need to configre
router.route('/update/:id').post((req, res) => {
    candidate.findById(req.params.id, (err, can) => {
        if (!can) {
            res.status(404).send("data not found");
        }
        else {
            can.name = req.body.name;
            can.email = req.body.email;
            can.number = req.body.number;
            // array push 
            can.rounds = [{
                title: req.body.title,
                comments: req.body.comments
            }]


            can.save().then(data => {
                res.json('update complete')
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                })

        }
    })

})



// defined the delete route 
router.route('/delete/:id').get((req, res) => {
    candidate.findByIdAndRemove({ _id: req.params.id }, (err, candidate) => {
        if (err) res.json(err);
        else res.json('Succesfully removed');
    })
})

module.exports = router;