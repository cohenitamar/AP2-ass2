const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    DisplayName: { type: String, required: true },
    ProfilePic: { type: String, required: true },
});


const chatSchema = new mongoose.Schema({});

const chatUserSchema = new mongoose.Schema({
    ChatsId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    UsersUsername: { type: String, ref: 'User', required: true },
});

const messageSchema = new mongoose.Schema({
    Created: { type: Date, required: true },
    SenderUsername: { type: String, ref: 'User', required: true },
    Content: { type: String, required: true },
    ChatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
});

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);
const ChatUser = mongoose.model('ChatUser', chatUserSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { User, Chat, ChatUser, Message };
