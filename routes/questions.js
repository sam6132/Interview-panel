const express = require('express');
const router = express.Router();
const { Questions } = require('../models/questions.model')

router.get('/', async (req, res) => {
    const questions = await Questions.find()
    res.send(questions);
})



router.get('/:id', async (req, res) => {
    const questions = await Questions.findOne({ _id: req.params.id })
    res.send(questions);
})


router.post('/', async (req, res) => {

    const que = await new Questions(req.body);
    que.save().then(async result => {
        res.send('success')


    })
        .catch(err => {
            res.json({
                success: false,

                message: err.message
            });
        });;

})

router.post('/create', async (req, res) => {

    const que = await new Questions(req.body);
    que.save().then(async result => {
        res.send('success')


    })
        .catch(err => {
            res.json({
                success: false,

                message: err.message
            });
        });;
})


router.post('/add/:q_id', async (req, res) => {
    console.log(req.body.question)
    try {
        const ques = await Questions.findOneAndUpdate({ _id: req.params.q_id }, { questions: req.body.question });


        res.send(questions)
        console.log(questions)
    } catch (err) { console.log(err.message) }

})

module.exports = router;
