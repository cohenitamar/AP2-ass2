import '../chat.css';
import ChatScreen from "../ChatScreen/ChatScreen";
import React, {useCallback, useEffect, useState} from "react";
import ContactScreen from "../ContactScreen/ContactScreen";
import Adapters from "../../Adapters";
import logout from "../Logout/Logout";
function ChatPage({username, token}) {
    const [contacts, setContacts] = useState([]);

    const [filters, setFilter] = useState(contacts);

    const [contactOnChat,setContactOnChat] = useState({});

    const [message, setMessage] = useState([]);


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
        API_getChats().then(data => {
            const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
            setContacts(newData);
            setFilter(newData);

        });
    }, [username]);


    return (<div className="container h-100">
        <div className="row h-100">
            <ContactScreen username={username} doSearch={doSearch} setContacts={setContacts} setFilter={setFilter}
                           contacts={contacts} setMessage={setMessage} setContactOnChat={setContactOnChat}
                           filters={filters} token={token} API_getChats={API_getChats}
                           API_getChatsByID={API_getChatsByID}/>
            <ChatScreen username={username} contacts={contacts} token={token} setMessage={setMessage}
                        contactOnChat={contactOnChat} message={message}
                        setFilter={setFilter} setContacts={setContacts}
                        API_getChats={API_getChats} API_getChatsByID={API_getChatsByID}/>
        </div>
    </div>);
}

export default ChatPage;