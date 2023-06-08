const mongoose = require('mongoose')

const orderShema = mongoose.Schema({
    products: {
        type : Array ,
        required : true
    } ,
    total : {
        type : Number ,
        required : true
    } ,
    userId : {
        type : mongoose.Types.ObjectId ,
        required : true
    } ,
    phone : {
        type : Number ,
         required : true
    }
})

const model = mongoose.model('order' , orderShema)
module.exports = model