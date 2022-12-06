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

protectedRouter.put('/profil/name',async (req,res)=>{
   const {name} = req.body
   const userToken = req.userToken;
   //const user = await User.findOneAndUpdate({email:userToken.email},{name:name},{new:true,upsert:true});
   let user = await User.findOne({email:userToken.email});
   user.name = name;
   await user.save();
   user = await User.findOne({email:userToken.email}).exec();
   console.log(user);
   res.status(201);
   return res.json(user.name)
})
protectedRouter.get('/profil',async (req,res)=>{
   const userToken = req.userToken;
   let user = await User.findOne({email:userToken.email}).exec();
   res.status(200);
   return res.json(user);
})
protectedRouter.put('/profil/photo',async (req,res)=>{
   const userToken = req.userToken;
   const {photo} = req.body;
   let user = await User.findOne({email:userToken.email}).exec();
   user.picture = photo;
   await user.save();
   user = await User.findOne().exec();
   res.status(201);
   return res.json(user)
})
protectedRouter.get('/test',async (req,res)=>{
  //  const {videoId} = req.params
  //  const comments = await Comment.find({videoId:videoId,parentId:null}).exec();
   res.status(200)
   return res.send('comments')
})

module.exports = protectedRouter