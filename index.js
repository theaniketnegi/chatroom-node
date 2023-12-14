const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io')

const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
io.on('connection', (socket)=>{
    console.log(`${socket.id} has entered the chat`);
    socket.on('disconnect', ()=>{
        console.log(`${socket.id} has left the chat`);
    });
    socket.on('user-message', (msg)=>{
        console.log(`Message: ${msg}`);
        io.emit('message', {id:socket.id, msg});
    })
})
//HTTP Requests
app.use(express.static(path.resolve('./public')))
app.get('/', (req,res)=>{
    return res.sendFile("/index.html")
})
server.listen(PORT, ()=>console.log(`SERVER STARTED AT ${PORT}`))