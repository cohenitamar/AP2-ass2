///GET CHATS - on login show contacts and conversations


///POST CHATS - create conversation on add of a freshly new contact


///GET CHAT BY ID - on contact click


///DELETE CHAT BY ID - not in use


///POST MESSAGES BY ID - send message


///GET MESSAGES BY ID - receive message


///GET USER BY USERNAME - add contacts


///POST USERS - register


import Avatars from "./ChatComponent/[images]/[avatars]/Avatars";

function ADAPTER_contactList(data) {
    var newData = [];
    for(let contact of data){
        const newContact = {
            id: contact["id"],
            name: contact["user"]["username"],
            pic: contact["user"]["profilePic"],
            lastMessage: contact["lastMessage"],
            ///TODO IN MONGO WE WILL SAVE THE LAST MESSAGE DATE!
            date: "MongoDB"
        };
        newData = [...newData, newContact];
    }
    return newData;
}


export default ADAPTER_contactList;