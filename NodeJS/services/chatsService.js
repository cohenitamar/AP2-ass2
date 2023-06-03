const Chat = require('../models/Chats');
const ChatUser = require('../models/ChatUser');
const User = require('../models/Users');
const Messages = require('../models/Messages')


const postChats = async (usernameHim, usernameMe) => {

    var user;
    try {
        user = await User.findOne({username: usernameHim});
    } catch (error) {
        return false;
    }
    // Check if user exists
    if (!user) {
        return -1;
    }
    var chat;
    // Create new Chat
    try {
        chat = new Chat();
        await chat.save();
    } catch (error) {
        return false;
    }
    try {
        // Create new ChatUser
        const chatUser1 = new ChatUser({
            ChatsId: chat._id,
            talkingTo: user.username,
            me: usernameMe

        });
        await chatUser1.save();

        const chatUser2 = new ChatUser({
            ChatsId: chat._id,
            me: user.username,
            talkingTo: usernameMe

        });
        await chatUser2.save();
    } catch (error) {
        return false;
    }
    // Construct response
    return {
        id: chat._id,
        user: {
            username: user.username,
            displayName: user.displayName,
            profilePic: user.profilePic,
        }
    }
}
const getChats = async (username) => {
    var data = [];
    var last;
    var chatUsers;
    // Fetch all chat IDs
    try {
        chatUsers = await ChatUser.find({me: username});
    } catch (error) {
        return false;
    }
    for (let chat of chatUsers) {
        var user;
        var lastMessage;
        //finds the user's details
        try {
            user = await User.findOne({username: chat["talkingTo"]});
            lastMessage = await Messages.find({chatId: chat["ChatsId"]}).sort({created: 'desc'}).limit(1);
        } catch (error) {
            return false;
        }
        if (!(Array.isArray(lastMessage) && lastMessage.length > 0)) {
            last = null;
        } else {
            last = {id: lastMessage[0]["_id"], created: lastMessage[0]["created"], content: lastMessage[0]["content"]};
        }
        const newChat = {id: chat["ChatsId"], user: user, lastMessage: last};
        data = [...data, newChat];
    }
    return data;
};



const sendMessage = async (username, string, id) => {
    var chatUser;
    try {
        chatUser = await ChatUser.findOne({ChatsId: id});
    } catch (error) {
        return false;
    }
    if (!chatUser) {
        return false;
    }
    if (username !== chatUser.me && username !== chatUser.talkingTo) {
        return false;
    }

    try {
        const message = new Messages({
            created: new Date().toLocaleString(),
            senderUsername: username,
            content: string,
            chatId: id
        })
        return await message.save();

    } catch (error) {
        return false;
    }
}

const getMessagesById = async (id, username) => {
    var messages;
    var chatUser;
    console.log(id);
    try {
        messages = await Messages.find({chatId: id});
        chatUser = await ChatUser.find({ChatsId: id});
    } catch (error) {
        return false;
    }
    if (chatUser.length !== 0) {
        if (username !== chatUser[0].me && username !== chatUser[0].talkingTo) {
            return -1;
        }
    } else {
        return false;
    }
    var users = [];
    try {
        var userX = await User.findOne({username: chatUser[0].me});
        var userY = await User.findOne({username: chatUser[1].me});
    } catch (error) {
        return false;
    }
    var userXtrim = {
        username: userX.username,
        displayName: userX.displayName,
        profilePic: userX.profilePic
    }
    var userYtrim = {
        username: userY.username,
        displayName: userY.displayName,
        profilePic: userY.profilePic
    }

    if (username === chatUser[0].me) {
        users = [...users, userXtrim];
        users = [...users, userYtrim];
    } else {
        users = [...users, userYtrim];
        users = [...users, userXtrim];
    }
    var messageseById = [];
    for (let msg of messages) {
        try {
            var sender = await User.findOne({username: msg.senderUsername});
        } catch (error) {
            return false;
        }
        var senderTrim = {
            username: sender.username,
            displayName: sender.displayName,
            profilePic: sender.profilePic
        }
        delete sender.password;
        var newMsg = {
            id: msg._id,
            created: msg.created,
            sender: senderTrim,
            content: msg.content
        }
        messageseById = [...messageseById, newMsg];
    }
    var idArray = {
        id: id,
        users: users,
        messages: messageseById
    }
    return idArray;
}


const getOnlyMessages = async (id, username) => {
    var chatUser;
    try {
        chatUser = await ChatUser.findOne({ChatsId: id});
    } catch (error) {
        return false;
    }
    if (!chatUser) {
        return false;
    }
    if (username !== chatUser.me && username !== chatUser.talkingTo) {
        return false;
    }
    var messageseById = [];
    var messages
    try {
        messages = await Messages.find({chatId: id});
    } catch (error) {
        return messageseById
    }
    for (let msg of messages) {
        var sender
        try {
            sender = await User.findOne({username: msg.senderUsername});
        } catch (error) {
            return false;
        }
        var senderTrim = {
            username: sender.username,
            displayName: sender.displayName,
            profilePic: sender.profilePic
        }
        delete sender.password;
        var newMsg = {
            id: msg._id,
            created: msg.created,
            sender: senderTrim,
            content: msg.content
        }
        messageseById = [newMsg, ...messageseById];
    }
    return messageseById;
}


const deleteChatById = async (id, username) => {
    var chatUser;
    try {
        chatUser = await ChatUser.findOne({ChatsId: id});
    } catch (error) {
        return false;
    }
    if (!chatUser) {
        return false;
    }
    if (username !== chatUser.me && username !== chatUser.talkingTo) {
        return -1;
    }


    try {
        await Messages.deleteMany({chatId: id});
        await ChatUser.deleteMany({ChatsId: id});
        await Chat.deleteOne({_id: id});
        return true;
    } catch (err) {
        return false;
    }
}


module.exports = {postChats, getChats, sendMessage, getMessagesById, getOnlyMessages, deleteChatById}

