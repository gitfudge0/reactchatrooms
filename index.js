const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.Server(app),
    io = require('./controllers/io')(server),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reactchatapp');

const PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(require('./controllers/api.js'));

server.listen(PORT, () => {
    console.log("React chat app backend running on port 3000");
})