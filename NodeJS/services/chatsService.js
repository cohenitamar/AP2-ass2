const Chat = require('../models/Chats').model;
const User = require('../models/Users').model;
const Message = require('../models/Messages').model;


// const postChats = async (usernameHim, usernameMe) => {
//
//     var user;
//     try {
//         user = await User.findOne({username: usernameHim});
//     } catch (error) {
//         return false;
//     }
//     // Check if user exists
//     if (!user) {
//         return -1;
//     }
//     var chat;
//     // Create new Chat
//     try {
//         chat = new Chat();
//         await chat.save();
//     } catch (error) {
//         return false;
//     }
//     try {
//         // Create new ChatUser
//         const chatUser1 = new ChatUser({
//             ChatsId: chat._id,
//             talkingTo: user.username,
//             me: usernameMe
//
//         });
//         await chatUser1.save();
//
//         const chatUser2 = new ChatUser({
//             ChatsId: chat._id,
//             me: user.username,
//             talkingTo: usernameMe
//
//         });
//         await chatUser2.save();
//     } catch (error) {
//         return false;
//     }
//     // Construct response
//     return {
//         id: chat._id,
//         user: {
//             username: user.username,
//             displayName: user.displayName,
//             profilePic: user.profilePic,
//         }
//     }
// }


const postChats = async (user1, user2) => {
    try {
        if (user1 === user2) {
            return false
        }

        const u1 = await User.findOne({username: user1});
        const u2 = await User.findOne({username: user2});
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
            user: [sender1, sender2]

        });
    } catch (error) {
        return false
    }

}


// const getChats = async (username) => {
//     var data = [];
//     var last;
//     var chatUsers;
//     // Fetch all chat IDs
//     try {
//         chatUsers = await ChatUser.find({me: username});
//     } catch (error) {
//         return false;
//     }
//     for (let chat of chatUsers) {
//         var user;
//         var lastMessage;
//         //finds the user's details
//         try {
//             user = await User.findOne({username: chat["talkingTo"]});
//             lastMessage = await Messages.find({chatId: chat["ChatsId"]}).sort({created: 'desc'}).limit(1);
//         } catch (error) {
//             return false;
//         }
//         if (!(Array.isArray(lastMessage) && lastMessage.length > 0)) {
//             last = null;
//         } else {
//             last = {id: lastMessage[0]["_id"], created: lastMessage[0]["created"], content: lastMessage[0]["content"]};
//         }
//         const newChat = {id: chat["ChatsId"], user: user, lastMessage: last};
//         data = [...data, newChat];
//     }
//     return data;
// };

function formatUser(data) {
    return {
        username: data.username,
        displayName: data.displayName,
        profilePic: data.profilePic

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
                lastMsg = chat.messages[chat.messages.length - 1];
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

    }

}


// const sendMessage = async (username, string, id) => {
//     var chatUser;
//     try {
//         chatUser = await ChatUser.findOne({ChatsId: id});
//     } catch (error) {
//         return false;
//     }
//     if (!chatUser) {
//         return false;
//     }
//     if (username !== chatUser.me && username !== chatUser.talkingTo) {
//         return false;
//     }
//
//     try {
//         const message = new Messages({
//             created: new Date().toLocaleString(),
//             senderUsername: username,
//             content: string,
//             chatId: id
//         })
//         return await message.save();
//
//     } catch (error) {
//         return false;
//     }
// }

const sendMessage = async (username, string, id) => {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            return false
        }
        var sender;
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
            sender: formatUser(user),
            content: string,
            created: date
        }

    } catch (error) {
        console.log(error);
    }
}


const getMessagesById = async (id, username) => {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            return false
        }
        if (username !== chat.users.at(0) && username !== chat.users.at(1)) {
            return false;
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
                sender: sender,
                created: msg.created,
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
        console.log(error);
    }

}


// const getMessagesById = async (id, username) => {
//     var messages;
//     var chatUser;
//     console.log(id);
//     try {
//         messages = await Messages.find({chatId: id});
//         chatUser = await ChatUser.find({ChatsId: id});
//     } catch (error) {
//         return false;
//     }
//     if (chatUser.length !== 0) {
//         if (username !== chatUser[0].me && username !== chatUser[0].talkingTo) {
//             return -1;
//         }
//     } else {
//         return false;
//     }
//     var users = [];
//     try {
//         var userX = await User.findOne({username: chatUser[0].me});
//         var userY = await User.findOne({username: chatUser[1].me});
//     } catch (error) {
//         return false;
//     }
//     var userXtrim = {
//         username: userX.username,
//         displayName: userX.displayName,
//         profilePic: userX.profilePic
//     }
//     var userYtrim = {
//         username: userY.username,
//         displayName: userY.displayName,
//         profilePic: userY.profilePic
//     }
//
//     if (username === chatUser[0].me) {
//         users = [...users, userXtrim];
//         users = [...users, userYtrim];
//     } else {
//         users = [...users, userYtrim];
//         users = [...users, userXtrim];
//     }
//     var messageseById = [];
//     for (let msg of messages) {
//         try {
//             var sender = await User.findOne({username: msg.senderUsername});
//         } catch (error) {
//             return false;
//         }
//         var senderTrim = {
//             username: sender.username,
//             displayName: sender.displayName,
//             profilePic: sender.profilePic
//         }
//         delete sender.password;
//         var newMsg = {
//             id: msg._id,
//             created: msg.created,
//             sender: senderTrim,
//             content: msg.content
//         }
//         messageseById = [...messageseById, newMsg];
//     }
//     var idArray = {
//         id: id,
//         users: users,
//         messages: messageseById
//     }
//     return idArray;
// }


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
        for (msg of chat.messages){
            var newMsg = {
                id : msg._id,
                sender : {
                    username : msg.sender
                },
                created:msg.created,
                content:msg.content
            }
            data = [newMsg,...data]

        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }

}







const getOnlyMessagess = async (id, username) => {
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

