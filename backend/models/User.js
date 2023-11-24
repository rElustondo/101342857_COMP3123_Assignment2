const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    status: Boolean
})

module.exports = mongoose.model('user',userSchema)