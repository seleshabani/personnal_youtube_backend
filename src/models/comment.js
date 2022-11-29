const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    content:{
        type:String,
        text:true
    },
    videoId:{
        type:String
    },
    likes:[{
        user:mongoose.Schema.Types.ObjectId
    }],
    dislikes:[{
        user:mongoose.Schema.Types.ObjectId
    }],
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const Comment = mongoose.model('Comment',CommentSchema);
module.exports = {CommentSchema,Comment}