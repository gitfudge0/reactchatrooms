const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    user: String,
    content: String,
    room: String
})