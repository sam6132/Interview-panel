const express = require('express');
const router = express.Router();
const { users } = require('../models/user.model');
const { Token } = require('../models/token.model');
const _ = require('lodash');


// const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const token = await Token.find();
    res.send(token);
})


router.get('/confirmation/:token', async (req, res) => {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) return res.status(400).send('We were unable to find a valid token. Your token my have expired.');

    const user = await users.findById({ _id: token._userId });
    if (!user) return res.status(400).send('no such user register');
    if (user.activated) return res.status(400).send('Already verified');
    await Token.findByIdAndDelete(token._id);


    user.activated = true;
    await user.save();
    res.redirect('http://192.168.0.160')
    res.json({
        success: true,
        email: req.body.email,
        user
    });
})
// get refresh tokens by user id
router.get('/:id', async (req, res) => {
    users.findOne({
        _id: req.params.id
    }).then(user => {

        const tokens = user.refreshTokens.map(tok => {
            return { id: tok._id, createdAt: tok.createdAt, ip: tok.ip }
        })
        return res.json({
            tokens
        })
    });
})

module.exports = router;