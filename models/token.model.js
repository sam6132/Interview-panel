const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { MAIL_ID, PASSWORD, HOST } = require('../config')

mongoose.set('useCreateIndex', true);

const TokenShema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
});


const Token = mongoose.model('Token', TokenShema);


async function sendMail(user) {
    const token = await new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
    })
    await token.save();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL_ID,
            pass: PASSWORD
        }
    });

    const mailOptions = {
        from: MAIL_ID, // sender address
        to: user.email, // list of receivers
        subject: `Account Verification Token', ${user.email}`,
        html: `<p>Click <a href="${HOST}/api/token/confirmation/${token.token}">here</a> Activate account</p>`
    };


    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}


module.exports = { Token, sendMail };