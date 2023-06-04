const mongoose = require("mongoose");

const chatUserSchema = new mongoose.Schema({
    ChatsId: { type: mongoose.Schema.Types.ObjectId, required: true },
    me: { type: String, required: true },
    talkingTo: { type: String, required: true },
});

module.exports = mongoose.model('ChatUser', chatUserSchema);