import Profile from "../Profile/Profile";
import AddContact from "../AddContact/AddContact";
import ContactModal from "../AddContact/ContactModal";
import React from 'react';


function TopBar({onAddContact ,filterUpdate , contactsList, username, searchBox, socket, token,API_getChats}){


    return (
        <span className="card-header top-bar m-0 d-flex align-items-center fw-bold fs-5 rounded-end-0">
        <Profile username={username} token={token} socket={socket} />
        <AddContact/>
            <ContactModal onAddContact={onAddContact} socket = {socket}
                          filterUpdate={filterUpdate} contactsList= {contactsList} searchBox={searchBox}
                          token={token} API_getChats = {API_getChats}/>
        </span>
    );
}

export default TopBar;