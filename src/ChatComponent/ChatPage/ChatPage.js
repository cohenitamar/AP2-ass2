import '../chat.css';
import ChatScreen from "../ChatScreen/ChatScreen";
import React, {useState} from "react";
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