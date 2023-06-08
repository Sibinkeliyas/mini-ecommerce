const mongoose = require('mongoose')

const cartShema = mongoose.Schema({
    products: {
        type : Array ,
        required : true
    } ,
    userId : {
        type : mongoose.Types.ObjectId ,
        required : true
    } ,
})

const model = mongoose.model('cart' , cartShema)
module.exports = model