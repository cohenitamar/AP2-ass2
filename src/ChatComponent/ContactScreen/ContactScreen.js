import TopBar from "../TopBar/TopBar";
import Search from "../SearchContact/Search";
import ContactList from "../ContactsList/ContactsList";
import Logout from "../Logout/Logout";
import React, {useRef} from "react";


function ContactScreen({username, doSearch, setContacts ,token, setFilter, contacts, setMessage,
                           setContactOnChat, filters,API_getChats}) {
    const searchBox = useRef("");

    return (
        <div className="col-12 col-md-6 col-lg-4 p-0 h-100" id="contactsContainer">
            <div className="card h-100 rounded-0 bg-light">
                <TopBar username={username} onAddContact={setContacts} token={token}
                        filterUpdate={setFilter} contactsList={contacts} searchBox={searchBox} API_getChats = {API_getChats}/>
                <Search doSearch={doSearch} searchBox={searchBox}/>
                <ContactList contacts={filters}
                             setContactOnChat = {setContactOnChat} setMessage={setMessage} token = {token}/>
                <Logout/>
            </div>
        </div>
    );
}

export default ContactScreen;