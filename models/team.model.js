const mongoose = require('mongoose');
const  nodemailer = require('nodemailer');

const teamShema =   new mongoose.Schema({
    team_lead : {
        name:{ type: String },
        email: {type:String },
    },
    
    Team_members: [{
        team_member_name: String,
        team_member_email: String
    }]
    })

const Team = mongoose.model('Team',teamShema)

function sendMail(user_email, leadID){
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
        subject: 'Sending Email using Node.js',
        html: `<p>Click <a href="http://localhost:3000/addMembers/${leadID}">here</a> Activate account</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = { Team, sendMail } ;