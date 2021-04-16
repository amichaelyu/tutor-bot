// pings replit so server
const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('Alive!')
    });

function keepAlive(){
    server.listen(3000, ()=>{console.log("Living!")});
    }

module.exports = keepAlive;