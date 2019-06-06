const mongoose = require('mongoose');
const  nodemailer = require('nodemailer');
// const previewEmail = require('preview-email');
const hbs = require('nodemailer-express-handlebars');
 

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
// step -1  configurate the mail
function sendMail(user_email, leadID){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sam@blockchainappfactory.com',
            pass: 'Josh@12345'
        }
        
    });
      
    
    console.log(`$(we are printing template) template`)  
    


    // step -2 we are using  to configure the mail 
    console.log("we are inside mail" + user_email);
    const mailOptions = {
        from: 'sam@blockchainappfactory.com',
        to: user_email,
        subject: 'please add your team members',
        // text : 'Hi team lead plese attach your team members details here click on the following link to add team members',
         html: `<p> Add team members</p> <p>Click <a href="http://localhost:3000/addMembers/${leadID}">here</a></p>`,
       
         attachments : [
               { filename: 'picture.JPG', path:__dirname +'/picture.JPG'},
        ],
        template: 'index'
    };

    // step -3 sending the mail 
    //  previewEmail(mailOptions);
     transporter.sendMail( mailOptions , function (error, info) {
        if (error) {
             console.log(error);
         } else {
             console.log('Email sent: ' + info.response);
         }
     });
}


module.exports = { Team, sendMail } ;