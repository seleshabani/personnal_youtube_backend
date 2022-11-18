const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    password:{
        type:String
    },
    picture:{
        type:String
    },
    notifications:[mongoose.Schema.Types.ObjectId]
})
const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema}