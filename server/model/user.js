const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    name: {
        type : String ,
        required : true
    } ,
    phone : {
        type : Number ,
        required : true
    } ,
    password : {
        type : String ,
        required : true
    }
})

const model = mongoose.model('user' , userShema)
module.exports = model