const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    picture:{
        type:String,
        required:false
    },
    notifications:[{type:mongoose.Schema.Types.ObjectId}]
})
const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema}