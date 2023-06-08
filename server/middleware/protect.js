const jwt = require('jsonwebtoken')

const protect = (req , res , next) => {
    try {
        let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1]
            let docode = jwt.verify(token , process.env.USER_CODE)
            if(docode) {
                next()
            } else {
                res.status(401).json('Invalid token')
            }
        } else {
            res.status(401).json('couldnt find token')
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

module.exports = protect