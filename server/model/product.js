const mongoose = require('mongoose')

const productShema = mongoose.Schema({
    image: {
        type : String ,
        required : true
    } ,
    productName : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
    }
})

const model = mongoose.model('products' , productShema)
module.exports = model