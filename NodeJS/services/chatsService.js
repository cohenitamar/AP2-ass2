const Chat = require('../models/Chats');
const ChatUser = require('../models/ChatUser');
const User = require('../models/Users');
const Messages = require('../models/Messages')


const postChats = async (usernameHim, usernameMe) => {
    const user = await User.findOne({username: usernameHim});
    console.log(usernameHim)
    // Check if user exists
    if (!user) {
        throw new Error('User not found');
    }

    // Create new Chat
    const chat = new Chat();
    await chat.save();

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
    // Fetch all chat IDs
    const chatUsers = await ChatUser.find({me: username});
    for (let chat of chatUsers) {
        //finds the user's details
        const user = await User.findOne({username: chat["talkingTo"]});
        var lastMessage = await Messages.find({chatId: chat["ChatsId"]}).sort({created: 'desc'}).limit(1);
        if (!(Array.isArray(lastMessage) && lastMessage.length > 0)) {
            last = null;
        } else {
            last = {id: lastMessage[0]["_id"], created: lastMessage[0]["created"], content: lastMessage[0]["content"]};
            await console.log(last);

        }
        delete user.password;
        ///TODO THERE WAS HERE chat._id
        const newChat = {id: chat["ChatsId"], user: user, lastMessage: last};
        data = [...data, newChat];
    }
    return data;
};


const sendMessage = async (username, string, id) => {

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
    var messages = await Messages.find({chatId: id});
    var chatUser = await ChatUser.find({ChatsId: id});
    var users = [];
    var userX = await User.findOne({username: chatUser[0].me});
    var userY = await User.findOne({username: chatUser[1].me});
    var userXtrim = {
        username : userX.username,
        displayName :userX.displayName,
        profilePic : userX.profilePic
    }
    var userYtrim = {
        username : userY.username,
        displayName :userY.displayName,
        profilePic : userY.profilePic
    }

    delete userX.password;
    delete userY.password;
    if (username === chatUser[0].me) {
        users = [...users, userXtrim];
        users = [...users, userYtrim];
    } else {
        users = [...users, userYtrim];
        users = [...users, userXtrim];
    }
    var messageseById = [];
    for (let msg of messages) {
        var sender = await User.findOne({username: msg.senderUsername});
        var senderTrim ={
            username : sender.username,
            displayName :sender.displayName,
            profilePic : sender.profilePic
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


/*
[
    {
        "id": 12,
        "created": "2023-05-31T13:17:26.3524435",
        "sender": {
            "username": "AAAA"
        },
        "content": "how are you man"
    },
    {
        "id": 11,
        "created": "2023-05-31T13:17:23.8008288",
        "sender": {
            "username": "AAAA"
        },
        "content": "adefrgadfg earthg"
    }
]
*/


const getOnlyMessages = async (id) =>{
    var messages = await Messages.find({chatId: id});
    var messageseById = [];
    for (let msg of messages) {
        var sender = await User.findOne({username: msg.senderUsername});
        var senderTrim ={
            username : sender.username,
            displayName :sender.displayName,
            profilePic : sender.profilePic
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





module.exports = {postChats, getChats, sendMessage, getMessagesById,getOnlyMessages}

