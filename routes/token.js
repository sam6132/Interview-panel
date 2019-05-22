const express = require('express');
const router = express.Router();
const { users } = require('../models/user.model');
const { Token } = require('../models/token.model');


// const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const token = await Token.find();
    res.send(token);
})


router.get('/confirmation/:token', async (req, res) => {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

    const user = await users.findById({ _id: token._userId });
    if (!user) return res.status(400).send('no such user register');
    if (user.activated) return res.status(400).send('Already verified');
    await Token.findByIdAndDelete(token._id);


    user.activated = true;
    await user.save();
    res.json({
        success: true,
        email: req.body.email,
        user
    });
})



module.exports = router;