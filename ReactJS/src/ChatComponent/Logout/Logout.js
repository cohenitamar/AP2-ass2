import React from "react";
import {Link} from 'react-router-dom'
import messageDatabase from "../Message/MessageDatabase";

function Logout() {
    return (

        <Link
            className="border-0 bg-danger form-control text-center link-underline-opacity-0 link-underline
            none_resize form-control-lg rounded-0" to="/" onClick={() => {
            for (let key in messageDatabase) {
                if (messageDatabase.hasOwnProperty(key)) {
                    delete messageDatabase[key];
                }
            }
        }
        }>
            <i className="bi bi-box-arrow-left me-1 p-0"/> Logout
        </Link>


    );
}

export default Logout;