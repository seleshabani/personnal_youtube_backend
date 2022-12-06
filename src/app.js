require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const { connectDb } = require('./models/dbConnection');
const authRouteur = require('./routes/auth');
const protectedRouter = require('./routes/protected');
const PORT = process.env.PORT || 3500;
const bodyParser = require('body-parser')
var cors = require('cors')
const {isUserLogedIn} = require('./hooks/midlwares');
const { json } = require('body-parser');
const registerCommentsHandlers = require('./routes/registerCommentsHandlers');

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
    app.use('/auth',authRouteur);
    app.use('/user',isUserLogedIn,protectedRouter);
    http.listen(PORT,()=>{
        console.log("serveur demarré à l'adresse : http://localhost:"+PORT)
    })

    const socketOnConnection = (socket) => {
        registerCommentsHandlers(io, socket);
        //registerUserHandlers(io, socket);
    }
    io.on('connection',socketOnConnection);
}
module.exports = run