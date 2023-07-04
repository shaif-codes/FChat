const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;


http.listen(PORT, '0.0.0.0',()=>{
    console.log(`listening on PORT ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//socket

const io = require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log("connected..");
    socket.on('message', (msg)=>{
        // console.log(msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('userJoined', (name)=>{
        socket.broadcast.emit('userJoined', name);
        // console.log(name);
    })
})


