const chatsService = require('../services/chatsService')
const jwt = require("jsonwebtoken")



const postChats = async (req, res) => {
    if (!req.body.username) {
        return res.status(400).json("Bad Request");
    }
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        var data;
        try {
            data = jwt.verify(token, "OriItamarTalKey");
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        let x = await chatsService.postChats(req.body.username, data.username);
        if (x === -10) {
            return res.status(404).json("error");
        } else if (x === -1) {
            return res.status(400).json("Can't talk with yourself");
        } else if (x === -2) {
            return res.status(400).json("No such user");
        }
        if (x) {
            res.send(x);
        } else {
            return res.status(404).json("error");
        }
    } else {
        return res.status(400).json("Bad Request");
    }
}

const getChats = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        var data;
        try {
            data = jwt.verify(token, "OriItamarTalKey");
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        let x = await chatsService.getChats(data.username);
        if (x === -10) {
            return res.status(404).json("error");
        }
        res.send(x);
    } else {
        return res.status(400).json("Bad Request");
    }
}



const sendMessage = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json("Bad Request");
    }
    if (!req.body.msg) {
        return res.status(400).json("Bad Request");
    }
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        var user;
        var data;
        try {
            const token = req.headers.authorization.split(" ")[1];
            data = jwt.verify(token, "OriItamarTalKey")
            user = data.username;
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        const message = req.body.msg;
        const id = req.params.id;

        const sent = await chatsService.sendMessage(user, message, id);
        if (sent === -10) {
            return res.status(404).json("error");
        } else if (!sent) {
            return res.status(401).json("Unauthorized");
        }
        res.send(sent);

    } else {
        return res.status(400).json("Bad Request");
    }
}

const getMessagesById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json("Bad Request");
    }
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        var data;
        try {
            data = jwt.verify(token, "OriItamarTalKey")
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        var x = await chatsService.getMessagesById(req.params.id, data.username);
        if (x === -10) {
            return res.status(404).json("error");
        } else if (x === -1) {
            return res.status(401).json("Unauthorized");
        } else {
            res.send(x);
        }
    } else {
        return res.status(400).json("Bad Request");
    }
}



const getOnlyMessages = async (req, res) => {
    var username;
    if (!req.params.id) {
        return res.status(400).json("Bad Request");
    }
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, "OriItamarTalKey");
            username = data.username;
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        const id = req.params.id;
        const sent = await chatsService.getOnlyMessages(id, username);
        if (sent === -10) {
            return res.status(404).json("error");
        } else if (!sent) {
            return res.status(401).json("Unauthorized");
        }
        res.send(sent);
    } else {
        return res.status(400).json("Bad Request");
    }
}

const deleteChatById = async (req, res) => {
    var data;
    if (!req.params.id) {
        return res.status(400).json("Bad Request");
    }
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            data = jwt.verify(token, "OriItamarTalKey")
        } catch (error) {
            return res.status(401).json("Unauthorized");
        }
        const user = data.username;
        const id = req.params.id;
        const sent = await chatsService.deleteChatById(id, user);
        if (sent === -10) {
            return res.status(404).json("error");
        } else if (sent === -1) {
            return res.status(401).json("Unauthorized");
        } else {
            res.send();
        }
    } else {
        return res.status(400).json("Bad Request")
    }
}


module.exports = {postChats, getChats, sendMessage, getMessagesById, getOnlyMessages, deleteChatById}
