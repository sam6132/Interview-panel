const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { MAIL_ID, PASSWORD } = require('../config')

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
            user: MAIL_ID,
            pass: PASSWORD
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