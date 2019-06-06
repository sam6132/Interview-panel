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

function sendMail(user_email, leadID) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sam@blockchainappfactory.com',
            pass: 'Josh@12345'
        }
    });
    console.log("we are inside mail" + user_email);
    const mailOptions = {
        from: 'sam@blockchainappfactory.com',
        to: user_email,
        subject: 'Team is created under your guidence',
        text: ' please add your team members to list',
        html: `<p>Click <a href="http://localhost:3000/teamMembers/${leadID}">here</a> Activate account</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = { Team, sendMail };