const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const app = express();
dotenv.config();

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

const isUserLogedIn = (req,res,next)=>{
    const idToken = req.headers.authorization;
    jwt.verify(idToken, publicKey, (err, decoded) => {
        if(err){
            return res.status(401).send("L'utilisateur n'est pas autorisé")
        }
        req.userToken = decoded
        next();
    })
}
module.exports = {isUserLogedIn};
