import Contact from "../Contact/Contact";
import {useState} from "react";
import Adapters from "../../Adapters"
import messageDatabase from "../Message/MessageDatabase";

function ContactList({contacts, setContactOnChat, setMessage, token, API_getChatsByID}) {

    const [activeContact, setActiveContact] = useState(null);

    function handleContactClick(id, pic, username, name, lastMessage, date) {
        setContactOnChat({id, pic, username, name, lastMessage, date});
        setActiveContact(username);
        API_getChatsByID(id).then(data => {
            if (data) {
                const msg = JSON.parse(data);
                const message = Adapters.ADAPTER_messageList(msg);
                setMessage(message);
                console.log(message)
            }
        });
    }




    const contactsList = contacts.map((contact, key) => {
        return <Contact {...contact} key={key} isActive={contact["username"] === activeContact}
                        onContactClick={handleContactClick}/>
    });
    return (
        <ul className="list-group rounded-0 h-100 overflow-auto">
            {contactsList}
        </ul>
    );
}

export default ContactList;