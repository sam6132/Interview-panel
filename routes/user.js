const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { users, genrateToken, validate } = require('../models/user.model');
// const auth = require('../middleware/auth')
const { sendMail } = require('../models/token.model');




//Get all user
router.get('/', async (req, res) => {
    const user = await users.find().sort('name');
    res.send(user);
});

//get user by id
router.get('/:id', async (req, res) => {
    const user = await users.findOne({
        _id: req.params.id
    });
    if (!user) return res.status(400).send('no such user register');
    res.send(user);
});

//Login user by name
router.post('/login', async (req, res) => {
    const user = await users.findOne({
        email: req.body.email
    });
    if (!user)
        return res.json({
            success: false,
            msg: 'User not found'
        });

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) throw err;

        if (!result)
            return res.json({
                success: false,
                msg: 'Wrong password'
            });

        const token = genrateToken(user)
        res.header('x-auth', token).json({
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                activated: user.activated
            }
        });
    });
});


//Register a user
router.post('/register', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await users.findOne({
        email: req.body.email
    });

    if (user) {
        return res.json({
            success: false,
            message: 'User Already Rgistered'
        });
    }

    user = new users({

        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save()
        .then(async result => {


            sendMail(req.headers.host, user)
            res.json({
                success: true,
                user: _.pick(result, ['role', 'email', 'activated'])
            });
        })
        .catch(err => {
            res.json({
                success: false,
                user: 'Cannot create a Account',
                err
            });
        });
});



//update user
router.put('/edit/:id', async (req, res) => {
    const user = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.json({
        success: true,
        user: _.pick(user, ['role', 'email', 'activated']),
        message: 'Updated Sucessfully'
    });
});

// delete user
router.delete('/:id', async (req, res) => {
    user = await users.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).send('no such user register');

    res.json({
        success: true,
        message: 'Deleted Sucessfully'
    });
});

router.get('/logout', async (req, res) => {
    blacklist.revoke(req.user)
    res.sendStatus(200);
})


module.exports = router;