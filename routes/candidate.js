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

    if(!candidate) return res.status(400).send('candidate not found')

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



// defined the delete route 
router.get('/delete/:id', auth, async (req, res) => {
    await candidates.findOneAndRemove({ _id: req.params.id }, async (err, result) => {

        res.send(result);
    });



})

// get request 
router.get('/getrounddetails/:id', async (req, res) => {

    try{
        const candidate = await candidates.findOne({_id:req.params.id})

    res.send(candidate.rounds)
    }catch(err){
        res.send('operation not performed')
    }
    
    
})

// update round details 
router.put('/updaterounddetails/:id',async(req,res) => {
    try {
    const candidate = await  candidates.findOneAndUpdate({_id :req.params.id})
    res.send(candidate.rounds)
     } catch(err){
    res.send('operation not performed')

}
})

// db.inventory.find( { tags: ["red", "blank"] } )

module.exports = router;

// i will be using getgetbyid to get the details 

// localhost:3000/getrounddetails/5ce8efa7e63c5a2ec622683a