const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { candidates } = require('../models/candidate.model');
// const { getNextCount } = require('../models/counter.model')
const { Team, sendMail } = require('../models/team.model');


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

    candidate = await new candidates(req.body);

    await candidate.save().then(async (candidate) => {

        const team = await Team.findOne({ _id: candidate.team })
        const mailIds = [];
        for (let member of team.members) {
            mailIds.push(member.email)
        }
        const mailOptions = {
            from: 'sam@blockchainappfactory.com',
            to: mailIds,
            subject: 'Interview process',
            text: 'A new Candidate is needed to be interviewed',
        };
        sendMail(mailOptions)
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
router.get('/edit/:id', async (req, res) => {
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

router.post('/addReview/:id', auth, async (req, res) => {
    const candidate = await candidates.findOne({ _id: req.params.id });

    if (!candidate) return res.status(400).send('candidate not found')
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
            message: 'Updated Failed' + err
        });
    }


})



router.post('/addSkill/:id', auth, async (req, res) => {
    const candidate = await candidates.findOne({ _id: req.params.id });

    if (!candidate) return res.status(400).send('candidate not found')
    console.log(req.body)

    candidate.skills.push(req.body.skill);

    try {
        await candidate.save();

        res.json({
            success: true,
            skills: candidate.skills,
            message: 'Updated Sucessfully'
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: 'Updated Failed' + err
        });
    }


})








// these is for getting by id 

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

//delete refresh token  of user by user_id token_id 
router.delete('/deleteReview/:c_id&:r_id', auth, async (req, res) => {
    candidates.findOneAndUpdate({ _id: req.params.c_id }, { $pull: { rounds: { _id: req.params.r_id } } }).then((candidate) => {

        res.json({
            success: true,
            message: "Review deleted successfully"
        })
    }).catch(err => {
        res.json({
            success: false,
            message: err.message
        })
    })
});




// defined the delete route 
router.delete('/delete/:id', auth, async (req, res) => {
    await candidates.findOneAndRemove({ _id: req.params.id }, async (err, result) => {

        res.send(result);
    });



})

// get request 
router.get('/getrounddetails/:id', async (req, res) => {

    try {
        const candidate = await candidates.findOne({ _id: req.params.id })

        res.send(candidate.rounds)
    } catch (err) {
        res.send('operation not performed')
    }


})

router.get('/getskills/:c_id', async (req, res) => {
    try {
        const candidate = await candidates.findOne({ _id: req.params.c_id })

        res.send(candidate.skills)
    } catch (err) {
        res.send(false)
    }
})

// update round details 
router.put('/updaterounddetails/:id', async (req, res) => {
    try {
        const candidate = await candidates.findOneAndUpdate({ _id: req.params.id })
        res.send(candidate.rounds)
    } catch (err) {
        res.send('operation not performed')

    }
})

// db.inventory.find( { tags: ["red", "blank"] } )

module.exports = router;

// i will be using getgetbyid to get the details 

// localhost:3000/getrounddetails/5ce8efa7e63c5a2ec622683a