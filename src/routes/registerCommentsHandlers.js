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
  
   // socket.on("comment:create", createComment);
    socket.on("comment:read", readComment);
    socket.on("comment:create",createComment);
}