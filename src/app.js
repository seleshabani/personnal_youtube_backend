require('dotenv').config();
const express = require('express');
const { connectDb } = require('./models/dbConnection');
const authRouteur = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3500;
const run = async ()=>{
    try {
        await connectDb(process.env.db);
    } catch (error) {
        console.log(error)
    }
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/auth',authRouteur);
    app.listen(PORT,()=>{
        console.log("serveur demarré à l'adresse : http://localhost:"+PORT)
    })
}
module.exports = run