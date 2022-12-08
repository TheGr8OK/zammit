const jwt = require('jsonwebtoken');
const Roles = require('../Roles');
require('dotenv').config;

function authenticateToken(req, res, next) {
    const token = req.headers.authorization
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        console.log(user)
        next()
    })
}

function authenticateRole(role) {
    return (req, res, next) => {
        if (req.user.Role !== role && req.user.Role !== Roles.ADMIN) {
                res.status(403).send("Not Allowed!")
            } 
            else {
                next()
            }
        
    }
}

module.exports = {
    authenticateToken,
    authenticateRole,
}
