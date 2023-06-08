const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (userId) => {
    try {
        return jwt.sign({userId} , process.env.USER_CODE , {
            expiresIn : '30d'
        })
    } catch (err) {
        
    }
}

module.exports = generateToken