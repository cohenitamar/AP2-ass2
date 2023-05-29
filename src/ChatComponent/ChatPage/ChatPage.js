import '../chat.css';
import ChatScreen from "../ChatScreen/ChatScreen";
import React, {useEffect, useState} from "react";
import ContactScreen from "../ContactScreen/ContactScreen";
import ADAPTER_contactList from "../../Adapters";
function ChatPage({username, token}) {
    const [contacts, setContacts] = useState([]);

    const [filters, setFilter] = useState(contacts);

    const [contactOnChat,setContactOnChat] = useState({});

    const [message, setMessage] = useState([]);


    const doSearch = function (q) {
        setFilter(contacts.filter(contact => contact.name.toLowerCase().includes(q.toLowerCase())));

    }
    useEffect(() => {
        const foo = async () => {
            const res = await fetch(`http://localhost:5000/api/Chats`, {
                'method': 'get',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            return res.text();
        }
        foo().then(data => {
            ///console.log(data)
            const newData = ADAPTER_contactList(JSON.parse(data));
            setContacts(newData);
            setFilter(newData);
        });
    }, [username]);






    return (<div className="container h-100">
        <div className="row h-100">
            <ContactScreen username={username} doSearch={doSearch} setContacts={setContacts} setFilter={setFilter}
                           contacts={contacts} setMessage={setMessage} setContactOnChat={setContactOnChat}
                           filters={filters} message={message} token={token}/>
            <ChatScreen username={username} contacts={contacts} token={token} setMessage={setMessage}
            contactOnChat={contactOnChat}/>
        </div>
    </div>);
}

export default ChatPage;