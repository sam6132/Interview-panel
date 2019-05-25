const { users } = require('../models/user.model');


module.exports = function (req, res, next) {
    users.findOne({
        _id: req.params.id
    }, { refreshTokens: { $elemMatch: { token: req.params.token } } }).then(user => {
        if (user.refreshTokens.length > 0) {
            return next();
        }
        return res.send('token blacklisted')
    });
}