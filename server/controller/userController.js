const { doAddUser, doLogin } = require("../helper/userHelper");
const generateToken = require("../middleware/generateToken");

exports.add_user = (req , res) => {
    try {
        doAddUser(req.body.userData).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.login_user = (req , res) => {
    try {
        doLogin(req.body.userData).then((data) => {
            const result = {
                _id : data._id , 
                token : generateToken(data._id) ,
                phone : data.phone
            }
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}