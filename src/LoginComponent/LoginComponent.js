import React from 'react';
import  './login.css'
import UserInput from './UserInput.js'
import {Link} from 'react-router-dom'

function LoginComponent({setUsername}) {

    const setPage = () => {
        document.getElementById("bodyOfIndex").classList.remove("bodyChat");
        document.getElementById("bodyOfIndex").classList.remove("bodyRegister");
        document.getElementById("root").classList.remove("h-100");
        document.getElementById("root").classList.remove("overflow-hidden");
        document.getElementById("root").classList.remove("m-0");
        document.getElementById("root").classList.remove("p-0");
        document.getElementById("htmlOfIndex").classList.remove("d-flex");
        document.getElementById("htmlOfIndex").classList.remove("justify-content-center");


        document.getElementById("bodyOfIndex").classList.add("bodyLogin");
        document.getElementById("bodyOfIndex").classList.add("row");
        document.getElementById("bodyOfIndex").classList.add("overflow-x-hidden");

    }

    setPage();



  return (
      <div className="col-12 d-flex justify-content-center">
      <div className="register rounded-5 ">
        <div className="header mt-3">Login</div>
        <UserInput u1="Username" u2="Password" setUsername={setUsername}/>
        <div className="ending">Don't Have An Account?</div>
        <div className="endingLink">
        <Link to="/register">
            Create an account
        </Link>
        </div>
      </div>
      </div>

  );
}

export default LoginComponent;
