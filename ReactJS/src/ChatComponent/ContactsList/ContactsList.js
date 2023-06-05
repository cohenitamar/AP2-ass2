import Contact from "../Contact/Contact";
import {useState} from "react";
import Adapters from "../../Adapters"


function ContactList({contacts, setContactOnChat, setMessage, socket, token, API_getChatsByID, newBadge, setNewBadge}) {

    const [activeContact, setActiveContact] = useState(null);


    function handleContactClick(id, pic, username, name, lastMessage, date) {
        setContactOnChat({id, pic, username, name, lastMessage, date});
        setActiveContact(id);
        setNewBadge(prev => {
            const newState = {...prev};
            newState[id] = false;
            return newState;
        });
        API_getChatsByID(id).then(data => {
            if (data) {
                const msg = JSON.parse(data);
                const message = Adapters.ADAPTER_messageList(msg);
                setMessage(message);
            }
        });
    }


    const contactsList = contacts.map((contact, key) => {
        return <Contact {...contact} key={key} isActive={contact["id"] === activeContact} newBadge={newBadge}
                        onContactClick={handleContactClick}/>
    });
    return (
        <ul className="list-group rounded-0 h-100 overflow-auto">
            {contactsList}
        </ul>
    );
}

export default ContactList;