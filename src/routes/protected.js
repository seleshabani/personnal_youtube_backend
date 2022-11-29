const express = require('express');
const { isUserLogedIn } = require('../hooks/midlwares');
const protectedRouter = express.Router();
const {User} = require('../models/users');
const {Comment} = require('../models/comment');

protectedRouter.post('/comment',async (req,res)=>{
    const {contenue,videoId} = req.body
    const userToken = req.userToken;
    const user = await User.findOne({email:userToken.email}).exec();
    const comment = await Comment.create({content:contenue,videoId:videoId,author:user._id});
    const comments = await Comment.find({videoId:videoId,parentId:null}).exec();
    res.status(201);
   return res.json(comments);  
})

protectedRouter.get('/comment/:videoId',async (req,res)=>{
    const {videoId} = req.params
    const comments = await Comment.find({videoId:videoId,parentId:null}).exec();
   res.status(200)
   return res.json(comments)
})

protectedRouter.get('/test',async (req,res)=>{
  //  const {videoId} = req.params
  //  const comments = await Comment.find({videoId:videoId,parentId:null}).exec();
   res.status(200)
   return res.send('comments')
})

module.exports = protectedRouter