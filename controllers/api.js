const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    path = require('path');

const Chat = mongoose.model('Chat', require('../models/model_chat'));

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

router.post('/join', (req, res) => {
    console.log(req.body.key)
    res.end();
})

router.get('/messages/:room', (req, res) => {
    Chat.find({
        'room': req.params.room
    }).exec((err, data) => {
        if(err) res.send("Failed");
        res.send(data);
    })
})

router.post('/message', (req, res) => {
    const newChat = new Chat(req.body);
    newChat.save((err, savedata) => {
        if(err) res.send("Failed");
        res.send(savedata);
    })
})

module.exports = router;