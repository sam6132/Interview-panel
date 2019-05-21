const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
// const auth = require('../middleware/auth')

mongoose.set('useCreateIndex', true);
const users = mongoose.model(
    'User',
    new mongoose.Schema({
        email: {
            type: String,
            required: true,
            minlength: 5,
            unique: true,
            maxlength: 30
        },
        password: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            required: true,

        }
    })
);

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

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: JSON.stringify(user)
        }, 'jwtPrivateKey');
        res.header('x-auth', token).json({
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
});

//Register a user
router.post('/register', async (req, res) => {
    const {
        error
    } = validateUser(req.body);
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

    user
        .save()
        .then(result => {
            res.json({
                success: true,
                user: _.pick(result, ['role', 'email'])
            });
        })
        .catch(err => {
            res.json({
                success: false,
                user: 'Cannot create a Account'
            });
        });
});

//update user
router.put('/:id', async (req, res) => {
    const user = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.json({
        success: true,
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

// validate user object from front end
function validateUser(user) {
    const schema = {
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(50)
            .required(),
        role: Joi.string()

            .required()
    };

    return Joi.validate(user, schema);
}

module.exports = router;