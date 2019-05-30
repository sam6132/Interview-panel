const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { users, genrateToken, validate, genrateRefreshToken } = require('../models/user.model');
const auth = require('../middleware/auth')
const tokenVerification = require('../middleware/tokenVerification')
const { sendMail } = require('../models/token.model');
const ip = require("ip");

//Get all user
router.get('/', async (req, res) => {
    const user = await users.find().sort('name');
    res.send(user);
});

//get user by id
router.get('/:id', async (req, res) => {
    const user = await users.findOne({
        _id: req.params.id
    });
    if (!user) return res.status(400).send('no such user register');
    res.send(user);
});

//Login user by name
router.post('/login', async (req, res) => {
    console.log(req.body)
    const user = await users.findOne({
        email: req.body.email
    });
    if (!user)
        return res.json({
            success: false,
            message: 'User not found'
        });

    if (!user.activated) return res.json({
        success: false,
        message: ' Account not activated, Check you mail for activation '
    });
    const accessToken = genrateToken(user._id)
    const refreshToken = genrateRefreshToken(user.id)



    await user.refreshTokens.push({
        token: refreshToken,
        ip: ip.address(),
        createdAt: Date.now()
    });

    await user.save();

    bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) throw err;

        if (!result)
            return res.json({
                success: false,
                message: 'Wrong password'
            });


        res.header('x-auth', accessToken).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                activated: user.activated,
            }
        });
    });
});


//Register a user
router.post('/register', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.send({
        success: false,
        message: error.details[0].message
    });

    let user = await users.findOne({
        email: req.body.email
    });

    if (user) {
        return res.json({
            success: false,
            message: 'User Already Rgistered'
        });
    }

    user = new users({

        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save()
        .then(async result => {


            sendMail(req.headers.host, user)
            res.json({
                success: true,
                user: _.pick(result, ['role', 'email', 'activated']),
                message: 'Account Created Successfully'
            });
        })
        .catch(err => {
            res.json({
                success: false,
                user: 'Cannot create a Account',
                err
            });
        });
});


router.get('/verify/:id&:token', [tokenVerification], async (req, res) => {
    const token = genrateToken(req.params.id)
    res.send(token)
});



//update user
router.put('/edit/:id', async (req, res) => {
    const user = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.json({
        success: true,
        user: _.pick(user, ['role', 'email', 'activated']),
        message: 'Updated Sucessfully'
    });
});

// delete user
router.delete('/:id', async (req, res) => {
    user = await users.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).send('no such user register');

    res.json({
        success: true,
        message: 'Deleted Sucessfully'
    });
});

//delete refresh token  of user by user_id token_id 
router.delete('/revoke/:id&:token_id', auth, async (req, res) => {
    users.findOneAndUpdate({ _id: req.params.id }, { $pull: { refreshTokens: { _id: req.params.token_id } } }).then((user) => {

        res.json({
            success: true,
            message: "Token revoked"
        })
    }).catch(err => {
        res.json({
            success: false,
            message: err.message
        })
    })


});


router.get('/logout/:id&:token', async (req, res) => {
    users.findOneAndUpdate({ _id: req.params.id }, { $pull: { refreshTokens: { token: req.params.token } } }).then((user) => {

        res.json({
            success: true,
            message: "Logged out"
        })
    }).catch(err => {
        res.json({
            success: false,
            message: err.message
        })
    })
})


module.exports = router;