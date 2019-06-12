const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);
const { JWTTOKEN } = require('../config');
mongoose.set('useFindAndModify', false);
const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    refreshTokens: [
        {
            token: String,
            ip: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]

});


const users = mongoose.model('User', userShema);

function genrateToken(user) {
    const token = jwt.sign({ data: JSON.stringify(user) }, JWTTOKEN, { expiresIn: '2hr' });

    return token;
}


function genrateRefreshToken(user) {
    const token = jwt.sign({ data: JSON.stringify(user) }
        , "SECRET FOR REFRESH TOKEN", { expiresIn: '3hr' });

    return token;
}

function validate(user) {
    const schema = {

        email: Joi.string()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(5)
            .max(50)
            .required(),
        role: Joi.string()
            .required(),
        team: Joi.required()
    };

    return Joi.validate(user, schema);
}


module.exports = {
    users, genrateToken, validate, genrateRefreshToken
}