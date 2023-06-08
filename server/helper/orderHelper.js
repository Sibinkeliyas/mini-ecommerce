const { default: mongoose } = require('mongoose')
const orderShema = require('../model/order')
const cartShema = require('../model/cart')

module.exports = {
    doAddOrder : ({data}) => {
        console.log(data);
        return new Promise((resolve, reject) => {
        cartShema.findOne({userId : new mongoose.Types.ObjectId(data.userId)}).then((res) => {
                if(res) {
                    const order = {
                        userId : data.userId ,
                        phone : data.phone ,
                        products : res.products,
                        total : data.total
                    }
                    orderShema.create(order).then((res) => {
                        cartShema.deleteOne({userId : data.userId}).then((data) => {
                            resolve(data)
                        }).catch((err) => {
                            reject(err)
                        })
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject('Nothing in cart')
                }
            }).catch((err) => {
                reject(err)
            })
            const order = {
                userId : data.userId ,
                phone : data.phone
            }
            
        })
    } ,
    doFindOrder : (userId) => {
        return new Promise((resolve, reject) => {
            orderShema.aggregate([
                {
                    $match : {
                        userId :new mongoose.Types.ObjectId(userId)
                    }
                } ,
                {
                    $lookup : {
                        from : 'products' ,
                        localField : 'products.productId',
                        foreignField:'_id',
                        as : 'products'
                    }
                }
            ]).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    doAddToCart : ({data , count}) => {
        return new Promise((resolve, reject) => {
            cartShema.findOne({userId : data.userId}).then((res) => {
                if(res) {
                    let product = res.products.findIndex((item) => item.productId == data.productId)
                    if(product !== -1) {
                        cartShema.updateOne({userId : data.userId , 'products.productId' : new mongoose.Types.ObjectId(data.productId)} ,{
                            $inc : {
                                'products.$.quantity' : count
                            }
                        }).then((data) => {
                            resolve(data)
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        let product = {
                        productId : new mongoose.Types.ObjectId(data.productId) ,
                        quantity : 1
                    }
                    cartShema.updateOne({userId : data.userId} , {
                        $push : {
                            products : product
                        }
                    }).then((data) => {
                        resolve(data)
                    }).catch((err) =>{
                        reject(err)
                    })
                    }
                } else {
                    let productData = {
                        userId : data.userId ,
                        products : [
                            {
                                productId : new mongoose.Types.ObjectId(data.productId) ,
                                quantity : 1
                            }
                        ]
                    }
                    cartShema.create(productData).then((data) => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    doFindCart : (id) => {
        return new Promise((resolve, reject) => {
            cartShema.aggregate([
                {
                    $match : {
                         userId : new mongoose.Types.ObjectId(id)
                    }
                } ,
                {
                    $unwind : '$products'
                } ,
                {
                    $lookup : {
                        from : 'products' ,
                        localField : 'products.productId',
                        foreignField : '_id' ,
                        as : 'product'
                    }
                }
            ]).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}