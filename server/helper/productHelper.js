const productShema = require('../model/product')

module.exports = {
    doAdd : (productData) => {
        return new Promise((resolve, reject) => {
            productShema.create(productData).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    } ,
    doFindProducts : ({page , perPage}) => {
        return new Promise(async(resolve, reject) => {
            let count = await productShema.find().count()
            productShema.find().then((data) => {
                resolve({data , count})
            }).catch((err) => {
                reject(err)
            })
        })
    } 
}