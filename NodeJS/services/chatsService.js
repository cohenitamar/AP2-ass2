const Chat = require('../models/Chats').model;
const User = require('../models/Users').model;
const Message = require('../models/Messages').model;


const postChats = async (user1, user2) => {
    try {
        if (user1 === user2) {
            return -1;
        }

        const u1 = await User.findOne({username: user1});
        const u2 = await User.findOne({username: user2});
        if (u1 === null || u2 === null) {
            return -2;
        }
        const sender1 = {
            username: u1.username,
            displayName: u1.displayName,
            profilePic: u1.profilePic
        }
        const sender2 = {
            username: u2.username,
            displayName: u2.displayName,
            profilePic: u2.profilePic
        }
        const newChat = new Chat({
            users: [sender1.username, sender2.username],
            messages: []
        })
        await newChat.save();
        return await ({
            id: newChat._id,
            user: sender1

        });
    } catch (error) {
        return -10;
    }
}

/*
{
  "id": 10,
  "user": {
    "username": "BLABLA",
    "displayName": "POLO ",
    "profilePic": "/static/media/easter_egg.d0d1d09d533aee0fddf4.png"
  }
}
 */


function formatUser(data) {
    return {
        username: data.username,
        displayName: data.displayName,
        profilePic: data.profilePic

    }
}

function formatLastMessage(data) {
    return {
        id: data._id,
        created: data.created,
        content: data.content

    }
}

const getChats = async (username) => {
    try {
        var data = [];
        const chats = await Chat.find({'users': username});
        for (let chat of chats) {
            const user1 = await User.findOne({username: chat.users[0]});
            const user2 = await User.findOne({username: chat.users[1]});
            const user1trim = formatUser(user1);
            const user2trim = formatUser(user2);
            var lastMsg
            if (chat.messages.length === 0) {
                lastMsg = null;
            } else {
                lastMsg = formatLastMessage(chat.messages[chat.messages.length - 1]);

            }
            var user;
            if (user1trim.username === username) {
                user = user2trim;
            } else {
                user = user1trim;
            }
            const send = {id: chat._id, user: user, lastMessage: lastMsg}
            data = [...data, send];
        }
        return data;

    } catch (error) {
        return -10;
    }

}


const sendMessage = async (username, string, id) => {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            return false
        }
        var sender;
        if (username !== chat.users.at(0) && username !== chat.users.at(1)) {
            return false;
        }
        if (chat.users[0] === username) {
            sender = chat.users[0];
        } else {
            sender = chat.users[1];
        }
        const user = await User.findOne({username: sender})
        const date = new Date().toLocaleString();
        const message = new Message({
            created: date,
            sender: sender,
            content: string,
            chatId: id
        })
        chat.messages.push(message);
        await chat.save();
        return {
            id: message._id,
            created: date,
            sender: formatUser(user),
            content: string
        }

    } catch (error) {
        return -10;
    }
}


const getMessagesById = async (id, username) => {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            return -1;
        }
        if (username !== chat.users.at(0) && username !== chat.users.at(1)) {
            return -1;
        }
        var user1, user2
        if (chat.users[0] === username) {
            user1 = chat.users[0];
            user2 = chat.users[1];
        } else {
            user1 = chat.users[1];
            user2 = chat.users[0];
        }
        const user1R = await User.findOne({username: user1});
        const user2R = await User.findOne({username: user2});
        const user1trim = formatUser(user1R);
        const user2trim = formatUser(user2R);
        var msgArray = [];
        for (let msg of chat.messages) {
            var sender;
            if (msg.sender === user1) {
                sender = user1trim
            } else {
                sender = user2trim;
            }
            var newData = {
                id: msg._id,
                created: msg.created,
                sender: sender,
                content: msg.content
            }
            msgArray = [...msgArray, newData];
        }
        var data = {
            id: chat._id,
            users: [user1trim, user2trim],
            messages: msgArray
        }
        return data;
    } catch (error) {
        return -10;
    }
}


const getOnlyMessages = async (id, username) => {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            return false
        }
        if (username !== chat.users.at(0) && username !== chat.users.at(1)) {
            return false;
        }
        var data = []
        for (msg of chat.messages) {
            var newMsg = {
                id: msg._id,
                created: msg.created,
                sender: {
                    username: msg.sender
                },
                content: msg.content
            }
            data = [newMsg, ...data]

        }
        return data;
    } catch (error) {
        return -10;
    }

}


const deleteChatById = async (id, username) => {
    var chatUser;
    try {
        chatUser = await Chat.findOne({_id: id});
    } catch (error) {
        return -1;
    }
    if (!chatUser) {
        return -1;
    }
    if (username !== chatUser.users[0] && username !== chatUser.users[1]) {
        return -1;
    }
    try {
        await Chat.deleteOne({_id: id});
        return true;
    } catch (err) {
        return -10;
    }
}


module.exports = {postChats, getChats, sendMessage, getMessagesById, getOnlyMessages, deleteChatById}

