import React, {useRef, useState} from 'react';
import Adapters from "../../Adapters";


function ContactModal({onAddContact, filterUpdate, contactsList, searchBox, token, API_getChats}) {

    const [error, setError] = useState("");

    const inputRef = useRef(null);
    const handleAddContact = () => {
        API_postChats().then(contact => {
            if (inputRef.current.value.length === 0) {
                setError(
                    <div className="alert alert-danger d-flex justify-content-center">
                        You must put a name in order to add.
                    </div>
                );
                return;
            }
            if (!contact) {
                setError(
                    <div className="alert alert-danger d-flex justify-content-center">
                        Invalid username.
                    </div>
                );
                return;
            }
            API_getChats().then(data => {
                const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
                onAddContact(newData);
                searchBox.current.value = "";
                filterUpdate(newData);
            });


            inputRef.current.value = "";
            setError("");
            document.getElementById("close_modal").click();
        })

    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleAddContact();
        }
    }


    const API_postChats = async () => {
        const data = {username: inputRef.current.value}
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            'body': JSON.stringify(data)
        })
        if (res.ok)
            return res.text();
        return false;
    }


    return (
        <div className="modal fade" id="add_contact_modal" tabIndex={-1} data-bs-backdrop="static">
            <div className="modal-dialog">
                {error}
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add A Contact</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            id="close_modal"
                            onClick={() => setError("")}
                        />
                    </div>
                    <div className="modal-body">
                        <div className="form-floating m-0 p-1 fw-bold-0 fw-normal">
                            <input
                                type="email"
                                className="form-control rounded-0"
                                id="floatingInput"
                                placeholder="Contact Username"
                                ref={inputRef}
                                onKeyPress={handleKeyPress}
                            />

                            <label htmlFor="floatingInput">Contact Username</label>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" onClick={handleAddContact}
                                className="add-contact-button btn btn-success w-100">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;