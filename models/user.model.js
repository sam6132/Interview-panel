const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const userShema = new mongoose.Schema({
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
    },
    activated: {
        type: Boolean,
        default: false
    }
});


const users = mongoose.model('User', userShema);

function genrateToken(user) {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: JSON.stringify(user)
    }, 'jwtPrivateKey');

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

            .required()
    };

    return Joi.validate(user, schema);
}


module.exports = {
    users, genrateToken, validate
}