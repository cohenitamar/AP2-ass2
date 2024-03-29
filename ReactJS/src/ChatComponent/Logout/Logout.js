import React from "react";
import {Link} from 'react-router-dom'




function Logout({socket, username}) {

    function handleLogout(){
        socket.current.emit("closeSocket",username);

    }

    return (

        <Link
            className="border-0 bg-danger form-control text-center link-underline-opacity-0 link-underline
            none_resize form-control-lg rounded-0" to="/" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-1 p-0"/> Logout
        </Link>


    );
}

export default Logout;