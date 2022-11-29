require('dotenv').config();
const express = require('express');
const { connectDb } = require('./models/dbConnection');
const authRouteur = require('./routes/auth');
const protectedRouter = require('./routes/protected');
const app = express();
const PORT = process.env.PORT || 3500;
const bodyParser = require('body-parser')
var cors = require('cors')
const {isUserLogedIn} = require('./hooks/midlwares');

const run = async ()=>{
    try {
        await connectDb(process.env.db);
    } catch (error) {
        console.log(error)
    }
    
    app.use(cors())
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    /* app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type','Authorization','authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    }); */
    app.use('/auth',authRouteur);
    app.use('/user',isUserLogedIn,protectedRouter);
    app.listen(PORT,()=>{
        console.log("serveur demarré à l'adresse : http://localhost:"+PORT)
    })
}
module.exports = run