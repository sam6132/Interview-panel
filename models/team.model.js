const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const teamShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team_lead: {
        name: { type: String },
        email: { type: String },
    },
    members: [{
        name: String,
        email: String
    }]
})

const Team = mongoose.model('Team', teamShema)

function sendMail(mailOptions) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sam@blockchainappfactory.com',
            pass: 'Josh@12345'
        }

    });

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = { Team, sendMail };