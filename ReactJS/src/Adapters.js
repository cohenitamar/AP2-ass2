///GET CHATS - on login show contacts and conversations
///POST CHATS - create conversation on add of a freshly new contact
///GET CHAT BY ID - on contact click
///DELETE CHAT BY ID - not in use
///POST MESSAGES BY ID - send message
///GET MESSAGES BY ID - receive message
///GET USER BY USERNAME - add contacts
///POST USERS - register


function ADAPTER_addContact(data) {
    return {
        id: data["id"],
        username: data["user"]["username"],
        name: data["user"]["displayName"],
        pic: data["user"]["profilePic"],
        lastMessage: data["lastMessage"] === null ? "" : data["lastMessage"]["content"],
        ///TODO IN MONGO WE WILL SAVE THE LAST MESSAGE DATE!
        date: data["lastMessage"] === null ? "" : data["lastMessage"]["created"]
    }
}


function ADAPTER_contactList(data) {
    var newData = [];
    for (let contact of data) {
        const newContact = {
            id: contact["id"],
            username: contact["user"]["username"],
            name: contact["user"]["displayName"],
            pic: contact["user"]["profilePic"],
            lastMessage: contact["lastMessage"] === null ? "" : contact["lastMessage"]["content"],
            ///TODO IN MONGO WE WILL SAVE THE LAST MESSAGE DATE!
            date: contact["lastMessage"] === null ? "" : contact["lastMessage"]["created"],
        };
        newData = [...newData, newContact];
    }
    return newData;
}


function ADAPTER_messageList(data) {
    var newData = [];
    for (let message of data["messages"]) {
        const newMessage = {
            message: message["content"],
            id: message["id"],
            me: message["sender"]["username"],
            pic: {[data["users"][0]["username"]] : data["users"][0]["profilePic"],
                [data["users"][1]["username"]] : data["users"][1]["profilePic"]},
            date: message === null ? "" : message["created"],
        };
        newData = [...newData, newMessage];
    }
    return newData;
}



function ADAPTER_sendMessage(data){
    return {
        message : data["content"],
        pic : {[data["sender"]["username"]]:data["sender"]["profilePic"]},
        me : data["sender"]["username"],
        date: data === null ? "" : data["created"],
    };

}


export default {ADAPTER_contactList, ADAPTER_addContact, ADAPTER_messageList, ADAPTER_sendMessage};

