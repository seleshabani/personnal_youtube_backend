const express = require('express');
const dotenv = require('dotenv');
const {User} = require('../models/users');
const { cryptPassword, comparePassword } = require('../hooks/password_functions');
const jwt = require('jsonwebtoken');
const { isUserLogedIn } = require('../hooks/midlwares');
const authRouteur = express.Router();
dotenv.config();

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY


authRouteur.post('/subscribe',async (req,res)=>{
    let email = req.body.email;
    let googleId = req.body.googleId;
    //return res.send('ok')
  //  let password = req.body.password;
    let verifuser = await User.findOne({email:email}).exec();
    if(verifuser) return res.status(403).json(false);
   // const ashedpasword = await cryptPassword(password);
    const user = await User.create({email:email,googleId:googleId});
    const token = jwt.sign({"email":email}, privateKey, {algorithm: "RS256"});

    if (user) {
        res.status(201);
        return res.json(token);
    }
    
    res.status(422);
    res.send('Impossible de créer l\'utilisateur');    
})

authRouteur.post('/login',async (req,res)=>{
    let email = req.body.email;
   // let password = req.body.password;
    let user = await User.findOne({email:email});
    if(!user) return res.status(403).json(false);
    //let isSamePassword = await comparePassword(password,user.password);

   // if(isSamePassword){
    const token = jwt.sign({"email":email}, privateKey, {algorithm: "RS256"})
    res.status(200);
    return res.json(token)
   // }
    //console.log(password,user.password);
    //res.status(200);
   // res.json('mot de passe incorrect');

})

module.exports = authRouteur;