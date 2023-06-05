import '../chat.css';
import ChatScreen from "../ChatScreen/ChatScreen";
import React, {useEffect, useRef, useState} from "react";
import ContactScreen from "../ContactScreen/ContactScreen";
import Adapters from "../../Adapters";
import {io} from "socket.io-client";

function ChatPage({username, token}) {
    const [contacts, setContacts] = useState([]);

    const [filters, setFilter] = useState(contacts);

    const [contactOnChat, setContactOnChat] = useState({});

    const [message, setMessage] = useState([]);

    const [newMessage, setNewMessage] = useState(null);

    const [newBadge, setNewBadge] = useState({});


    const socket = useRef(null);
    const doSearch = function (q) {
        setFilter(contacts.filter(contact => contact.name.toLowerCase().includes(q.toLowerCase())));

    }

    const API_getChats = async () => {
        const res = await fetch(`http://localhost:5000/api/Chats`, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return res.text();
    }


    const API_getChatsByID = async (id) => {
        const res = await fetch(`http://localhost:5000/api/Chats/${id}`, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (res.ok) {
            return res.text();
        }
        return false;
    }


    useEffect(() => {
        if (isEmpty(contactOnChat)) {
            return;
        }
        if (contactOnChat.id === newMessage.chatID) {
            setNewBadge(prev => {
                const newState = {...prev};
                newState[newMessage['chatID']] = false;
                return newState;
            });
            setMessage([...message, newMessage.message]);
        }
    }, [newMessage]);


        useEffect(() => {
        socket.current = io('http://localhost:5000');

        socket.current.emit("connecting", username);

        socket.current.on("add-contact", () => {
            API_getChats().then(data => {
                const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
                setContacts(newData);
                setFilter(newData);
            });
        });
        socket.current.on("receive-message", (msgFormat) => {
            API_getChats().then(data => {
                const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
                setContacts(newData);
                setFilter(newData);
            });
            // find(user from contact)
            setNewBadge(prev => {
                const newState = {...prev};
                newState[msgFormat['chatID']] = true
                return newState;
            });
            setNewMessage(msgFormat);
        });
        socket.current.on("disconnect", () => {
        });
        API_getChats().then(data => {
            const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
            setContacts(newData);
            setFilter(newData);
        });
    }, [username]);


    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    return (<div className="container h-100">
        <div className="row h-100">
            <ContactScreen username={username} doSearch={doSearch} socket={socket} setContacts={setContacts}
                           setFilter={setFilter} setNewBadge={setNewBadge}
                           contacts={contacts} setMessage={setMessage} setContactOnChat={setContactOnChat}
                           filters={filters} token={token} API_getChats={API_getChats} newBadge={newBadge}
                           API_getChatsByID={API_getChatsByID}/>
            <ChatScreen username={username} contacts={contacts} socket={socket} token={token} setMessage={setMessage}
                        contactOnChat={contactOnChat} message={message}
                        setFilter={setFilter} setContacts={setContacts}
                        API_getChats={API_getChats} API_getChatsByID={API_getChatsByID}/>
        </div>
    </div>);
}

export default ChatPage;