const {Comment} = require('../models/comment');
const {User} = require('../models/users');

module.exports = (io, socket) => {

    const createComment = async (payload) => {
      // la récuperation de l'email du user via la req est temporaire (il doit être recuperé via le token au futur)
      const {contenue,videoId,userMail} = JSON.parse(payload)
     // const userToken = req.userToken;
      const user = await User.findOne({email:userMail}).exec();
      const comment = await Comment.create({content:contenue,videoId:videoId,author:user._id});
      const comments = await Comment.find({videoId:videoId,parentId:null}).populate('author').exec();
      io.emit('comment:get',JSON.stringify(comments))
    }
  
    const readComment = async (videoId) => {
      const comments = await Comment.find({videoId:videoId,parentId:null}).populate('author').exec();
      io.emit('comment:get',JSON.stringify(comments))
    }
  
    const createCommentResponse = async(payload) =>{
        const {contenue,token,videoId,email,parentId} = JSON.parse(payload);
        const user = await User.find({email:email}).exec();
        const comment = await Comment.create({content:contenue,videoId:videoId,author:user._id,parentId:parentId});
        const comments = await Comment.find({videoId:videoId,parentId:parentId}).exec();
        io.emit('comment:get:response',comments);
      }
   // socket.on("comment:create", createComment);
    socket.on("comment:read", readComment);
    socket.on("comment:create",createComment);
    socket.on("comment:create:response",createCommentResponse);
}