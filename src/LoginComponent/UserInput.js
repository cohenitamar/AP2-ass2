import React, {useRef} from 'react';
import './login.css'
import InputVal from "./InputVal";
import Vcheck from "./Vcheck";
import LoginButton from "./LoginButton";
import accountsDatabase from "./AccountsDatabase";


function UserInput({u1, u2, setUsername}) {


    const userInput = useRef(null);
    const password = useRef(null);
    const loginButton = useRef(null);

    function handleClick(event) {
        if (!(userInput.current.value in accountsDatabase)) {
            userInput.current.value = "";
            password.current.value = "";
            alert("This user is not registered please register first.")
            event.preventDefault();
            return;
        }
        if (!(password.current.value === accountsDatabase[userInput.current.value]['password'])) {
            event.preventDefault();
            alert("Invalid password.")
        }
        setUsername(userInput.current.value);
        userInput.current.value = "";
        password.current.value = "";
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            loginButton.current.click();
        }
    }

    return (

        <div className="inputUser">
            <div className="mb-3 mt-1">{u1}</div>
            <InputVal inputType="text" iconType="bi bi-person" inputRef={userInput} func={handleKeyPress}/>
            <div className="mb-3 mt-3">{u2}</div>
            <InputVal inputType="password" iconType="bi bi-lock" inputRef={password} func={handleKeyPress}/>
            <p className="forget text-decoration-underline" >
                Forgot Password?
            </p>
            <Vcheck/>
            <LoginButton handleClick={handleClick} reference={loginButton}/>
        </div>
    );
}

export default UserInput;