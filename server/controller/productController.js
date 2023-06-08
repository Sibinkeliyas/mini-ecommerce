const { doAdd, doFindProducts } = require("../helper/productHelper")

exports.add_Product = (req , res) => {
    try {
        doAdd(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.find_Product = (req , res) => {
    try {
        doFindProducts(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}