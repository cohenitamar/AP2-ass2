const mongoose = require("mongoose");

const Messages = new mongoose.Schema({
    created: { type: Date, required: true },
    senderUsername: { type: String,  required: true },
    content: { type: String, required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, required: true},

});

module.exports = mongoose.model('Messages',Messages);
