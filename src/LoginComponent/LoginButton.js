import './login.css'
import React from "react";
import {Link} from 'react-router-dom'


function LoginButton({handleClick, reference, classRef}){



    return(
        <div className="LoginButton"
        ref={classRef}>
            <Link to="/chat">
            <button type="button" className="btn btn-secondary" ref={reference} onClick={handleClick}>
                Login
            </button>
            </Link>
        </div>
    );
}

export default LoginButton;