const chatsService = require('../services/chatsService')
const jwt = require("jsonwebtoken")
const Message = require("../models/Messages");
const User = require("../models/Users")



const postChats = async (req, res) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "OriItamarTalKey");
        let x = await chatsService.postChats(req.body.username, data.username);
        if (x) {
            res.send(x);
        } else {
            return res.status(404).json("Didn't add chat");
        }
    }
}

const getChats = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "OriItamarTalKey");
        let x = await chatsService.getChats(data.username);
        res.send(x);
    }
}

const getMessagesById = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "OriItamarTalKey")
        var x = await chatsService.getMessagesById(req.params.id, data.username);
        res.send(x);
    }
}


const sendMessage = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "OriItamarTalKey")
        const user = data.username;
        console.log(user);
        const message = req.body.msg;
        console.log(message);
        const id = req.params.id;
        const sent = await chatsService.sendMessage(user, message, id);
        if (!sent) {
            return res.status(404).json("error");
        }
        const myUser = await User.findOne({username: data.username})
        delete myUser.password;
        const x = {
            id: sent._id,
            created: sent.created,
            sender: {
                username: myUser.username,
                displayName: myUser.displayName,
                profilePic: myUser.profilePic
            },
            content: sent.content
        }
        res.send(x);

    }
}


const getOnlyMessages = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "OriItamarTalKey")
        const user = data.username;
        const id = req.params.id;
        //TODO CHANGE CREATED
        const sent = await chatsService.getOnlyMessages(id);
        if (!sent) {
            return res.status(404).json("error");
        }
        res.send(sent);
    }

}


    module.exports = {postChats, getChats,sendMessage, getMessagesById,getOnlyMessages}
