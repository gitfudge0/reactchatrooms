const mongoose = require('mongoose');

const Chat = mongoose.model('Chat', require('../models/model_chat'));

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        console.log("connection established")

        socket.on('new user', data => {
            console.log(`New user ${data.user} joined the room ${data.room}`)
            socket.join(data.room);
        })

        socket.on('leave room', data => {
            console.log(`${data.user} leaving ${data.room}`)
            socket.leave(data.room)
        })

        socket.on('new message', data => {
            console.log(`New message from ${data.user}: ${data.content}`)
            const newChat = new Chat(data);
            newChat.save((err, res) => {
                if(err) socket.to(data.room).emit('error', err);
                console.log(res)
                socket.to(res.room).emit('new message', res);
            })
        })

        socket.on('disconnect', data => {
            console.log("Disconnected")
        })

    })
    
}