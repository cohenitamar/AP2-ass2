import Contact from "../Contact/Contact";
import {useState} from "react";
import messageDatabase from "../Message/MessageDatabase";

function ContactList({contacts, setContactOnChat, setMessage}) {

    const [activeContact, setActiveContact] = useState(null);

    function handleContactClick(pic, name, lastMessage, date) {
        setMessage([])
        if (activeContact in messageDatabase) {
            setMessage(Array.from(messageDatabase[name] || {}));
        }
        setActiveContact(name);
        setContactOnChat({pic, name, lastMessage, date});
    }

    const contactsList = contacts.map((contact, key) => {
        return <Contact {...contact} key={key} isActive={contact.name === activeContact}
                        onContactClick={handleContactClick}/>
    });
    return (
        <ul className="list-group rounded-0 h-100 overflow-auto">
            {contactsList}
        </ul>
    );
}

export default ContactList;