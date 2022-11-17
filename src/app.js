const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

const run = async ()=>{

    app.listen(PORT,()=>{
        console.log("serveur demarré à l'adresse : http://localhost:"+PORT)
    })
}
module.exports = run