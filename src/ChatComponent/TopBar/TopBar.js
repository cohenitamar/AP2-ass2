import Profile from "../Profile/Profile";
import AddContact from "../AddContact/AddContact";
import ContactModal from "../AddContact/ContactModal";
import React from 'react';


function TopBar({onAddContact ,filterUpdate , contactsList, username, searchBox, token}){


    return (
        <span className="card-header top-bar m-0 d-flex align-items-center fw-bold fs-5 rounded-end-0">
        <Profile username={username} token={token} />
        <AddContact/>
            <ContactModal onAddContact={onAddContact}
                          filterUpdate={filterUpdate} contactsList= {contactsList} searchBox={searchBox}/>
        </span>
    );
}

export default TopBar;