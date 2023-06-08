const { doAddOrder, doFindOrder, doAddToCart, doFindCart } = require("../helper/orderHelper")

exports.addToCart = (req , res) => {
    try {
        doAddToCart(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.findCart = (req , res) => {
    try {
        doFindCart(req.query.id).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.createOrder = (req , res) => {
    try {
        doAddOrder(req.body).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(401).json(err)
        })
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.findOrder = (req , res) => {
    try {
        doFindOrder(req.query.id).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err);
            res.status(401).json(err)
        })
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}