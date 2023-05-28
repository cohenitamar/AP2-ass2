import React, {useRef} from 'react';
import './login.css'
import InputVal from "./InputVal";
import Vcheck from "./Vcheck";
import LoginButton from "./LoginButton";
import accountsDatabase from "./AccountsDatabase";


function UserInput({u1, u2, setUsername, setToken}) {


    const userInput = useRef(null);
    const password = useRef(null);
    const loginButton = useRef(null);
    const unseen = useRef(null);
    const seen = useRef(null);
    const checkUser = useRef(null);
    const checkPassword = useRef(null);
    const buttonDiv = useRef(null);


    function toSee() {
        unseen.current.classList.add("d-none");
        seen.current.classList.remove("d-none");
        password.current.type = 'text';
    }

    function toHide() {
        unseen.current.classList.remove("d-none");
        seen.current.classList.add("d-none");
        password.current.type = 'password';
    }

    function handleClick(event) {
        foo();
        buttonDiv.current.classList.add("LoginButton2");
        checkPassword.current.classList.add("d-none");
        checkUser.current.classList.add("d-none");
        if (!(userInput.current.value in accountsDatabase)) {
            userInput.current.value = "";
            password.current.value = "";
            checkUser.current.classList.remove("d-none");
            event.preventDefault();
            return;
        }
        console.log(accountsDatabase[userInput.current.value]['password']);
        if (!(password.current.value === accountsDatabase[userInput.current.value]['password'])) {
            event.preventDefault();
            checkPassword.current.classList.remove("d-none");
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

    const foo = async () => {
        const data = {
            username: userInput.current.value,
            password: password.current.value
        }
        const res = await fetch('http://localhost:5000/api/Tokens', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(data)
        })
        if (res.ok) {
            setToken(await res.text());
        } else
            console.log("ZBI")
    }

    return (

        <div className="inputUser">
            <div className="mb-2 mt-1">{u1}</div>
            <InputVal inputType="text" iconType="bi bi-person" inputRef={userInput} func={handleKeyPress}
                      checkUser={checkUser}/>
            <div className="mb-2 pt-2">{u2}</div>
            <InputVal inputType="password" iconType="bi bi-lock" inputRef={password} func={handleKeyPress}
                      innerIcon1="bi bi-eye iconPassword" innerIcon2="bi bi-eye-slash iconPassword"
                      checkPassword={checkPassword}
                      seen={seen} unseen={unseen} toSee={toSee} toHide={toHide}/>
            <p className="forget text-decoration-underline">
                Forgot Password?
            </p>
            <Vcheck/>
            <LoginButton handleClick={handleClick} reference={loginButton} classRef={buttonDiv}/>
        </div>
    );
}

export default UserInput;