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
    let password = req.body.password;
    const ashedpasword = await cryptPassword(password);
    const user = await User.create({email:email,password:ashedpasword,googleId});
    const token = jwt.sign({email}, privateKey, {algorithm: "RS256"});

    if (user) {
        res.status(201);
        return res.send(token);
    }
    
    res.status(422);
    res.send('Impossible de créer l\'utilisateur');    
})

authRouteur.post('/login',async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email:email});
    let isSamePassword = await comparePassword(password,user.password);
    if(isSamePassword){
        const token = jwt.sign({email}, privateKey, {algorithm: "RS256"})
        res.status(200);
        return res.send(token)
    }
    res.status(200);
    res.json({user});

})
authRouteur.get('/protected',isUserLogedIn,(req,res)=>{
    return res.status(200).send('hello');
})
module.exports = authRouteur;