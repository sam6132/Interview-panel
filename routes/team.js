const express = require('express');
const router = express.Router();
const { Team, sendMail } = require('../models/team.model');
const nodemailer = require('nodemailer');

// post the team details


router.get('/', async (req, res) => {
    const teams = await Team.find()
    res.send(teams);
})
router.get('/members/:t_id', async (req, res) => {
    const team = await Team.findOne({ _id: req.params.t_id })
    if (!team) return res.status(400).send("Team not found")
    res.send(team);
})
router.post('/createTeam', async (req, res) => {

    // now decreare a constble 
    console.log(req.body);
    let team = await new Team({
        name: req.body.name,
        team_lead: req.body.team_lead
    });
    let lead_mailID = req.body.team_lead.email
    // console.log(lead_mailID);
    try {
        sendMail(lead_mailID, team._id)

        await team.save()
        res.send("mail send to person")

    } catch (err) {
        console.log(err.message)
    }
})
// we have to push to the db
router.post('/addTeamMembers/:id', async (req, res) => {

    try {
        // console.log()
        // team.members.push(req.body);
        await Team.findOneAndUpdate({ _id: req.params.id }, { $push: { members: req.body } });
        // print team details
        // console.log("we are printing the team details"); 
        // console.log(team_Details);
        // if (!team) return res.status(400).send('team not created yet')

        await team.save();
        res.json({
            success: true,
            team
        });
    }
    catch (err) {
        res.json({
            success: false,
            err: err.message
        });
    }
})



module.exports = router;


// post the team members  


