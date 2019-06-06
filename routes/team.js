const express = require('express');
const router = express.Router();
const { Team, sendMail  } = require('../models/team.model');
const  nodemailer = require('nodemailer');
const previewEmail =  require('preview-email');


// post the team details
router.post('/Teamlead', async(req,res) => {

    let team = await  new Team(req.body);
    let lead_mailID = req.body.team_lead.email
    // console.log(lead_mailID);
    try{
    sendMail(lead_mailID, team._id)

    await team.save()
    res.send("mail send to person")

    }catch(err){
        console.log(err.message)
    }
})
// we have to push to the db
router.post('/Teammembers/:id', async(req,res) => {
    const  team_Details  = await Team.findOne({ _id: req.params.id });
    // print team details
    console.log("we are printing the team details"); 
    console.log(team_Details);
    team_Details.Team_members.push(req.body);
 
    try {
        await team_Details.save();
        res.json({
            success: true,
            team_Details
        });
    }
    catch (err) {
        res.json({
            success: false,
            err:err.message
        });
    }
})



module.exports = router;


// post the team members  


