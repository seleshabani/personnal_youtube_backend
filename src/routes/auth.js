const express = require('express');
const authRouteur = express.Router();

// vérifie l'existence du mail
authRouteur.post('/verif',async (req,res)=>{
    res.status(200);
    res.send('hello')
})
// inscrit le user 
authRouteur.post('/subscribe',async (req,res)=>{
    //
})
authRouteur.post('/login',async(req,res)=>{
    //
})
module.exports = authRouteur;