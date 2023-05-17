import './register.css'
import '../shared_background.jpg'
import UserInput from "./UserInput/UserInput";
import UploadPic from "./UploadPic/UploadPic";
import {Link} from 'react-router-dom'
import accountsDatabase from "../LoginComponent/AccountsDatabase";
import React, {useRef, useState} from 'react';
import user from "./UploadPic/user.png";
import easter from "./UploadPic/easter_egg.png"

function RegisterComponent() {

    const userFirstName = useRef(null);
    const userLastName = useRef(null);
    const passwordVal = useRef(null);
    const nickName = useRef(null);
    const confirnPassword = useRef(null);
    const [imageSrc, setImageSrc] = useState(user);


    let password = "";
    let confirmPassword = "";

    const setPage = () => {
        document.getElementById("bodyOfIndex").classList.remove("bodyChat");
        document.getElementById("bodyOfIndex").classList.remove("bodyLogin");
        document.getElementById("root").classList.remove("h-100");
        document.getElementById("root").classList.remove("m-0");
        document.getElementById("root").classList.remove("p-0");
        document.getElementById("htmlOfIndex").classList.remove("d-flex");
        document.getElementById("htmlOfIndex").classList.remove("justify-content-center");

        document.getElementById("bodyOfIndex").classList.add("bodyRegister");
        document.getElementById("bodyOfIndex").classList.add("row");
        document.getElementById("bodyOfIndex").classList.add("overflow-x-hidden");



    }

    setPage();

    function handleFunc(event) {
        password = event.target.value;
        if (event.target.value.length > 0 && confirmPassword.length > 0) {
            if (areSimilar(password, confirmPassword) === false) {
                changeColor();
            } else {
                changeColor();
            }
        }
    }

    function areSimilar(str1, str2) {
        return str1 === str2;
    }

    function changeColor() {
        let confirmBox = document.getElementById("conDivR")
        confirmBox.classList.add("rounded-2");
        confirmBox.style.boxShadow = "0 0 0 0.15rem red"
        confirmBox.style.borderColor = "green";


    }

    function cancelColor() {
        let confirmBox = document.getElementById("conDivR")
        confirmBox.classList.remove("rounded-2");
        confirmBox.style.boxShadow = "none";
    }

    function handleConfirm(e) {
        confirmPassword = e.target.value;
        if (areSimilar(password, confirmPassword) === false) {
            changeColor();
        } else {
            cancelColor();
        }
    }

    function handleClick(event) {
        var valid = true;
        if (userFirstName.current.value === "" || userLastName.current.value === "") {
            event.preventDefault();
            alert("Please type your first and last name!");
            valid = false;
        }
        else if (nickName.current.value.length < 3) {
            alert("The nickname must be at least 3 characters long!");
            event.preventDefault();
            valid = false;
        } else if (nickName.current.value in accountsDatabase) {
            event.preventDefault();
            alert("Nickname already exists!");
            valid = false;
        } else if (!(validate(passwordVal.current.value))) {
            event.preventDefault();
            alert("Invalid password!");
            valid = false;
        } else if (passwordVal.current.value !== confirnPassword.current.value) {
            event.preventDefault();
            alert("Passwords don't match!");
            valid = false;
        }

        cancelColor();

        if (valid) {
            accountsDatabase[nickName.current.value] = {
                password: passwordVal.current.value,
                first_name: userFirstName.current.value, last_name: userLastName.current.value,
                pic: !imageSrc.startsWith("data:image/") || imageSrc === "/static/media/user.4eddcc79e0488c03d196.png" ?
                    easter : imageSrc}
            }


        confirnPassword.current.value = ""
        nickName.current.value = ""
        userLastName.current.value = ""
        passwordVal.current.value = ""
        userFirstName.current.value = ""

    }

    function validate(password) {
        // Check for username length


        // Check for password length
        if (password.length < 8) {
            return false;
        }

        // Check for at least one uppercase, one lowercase, and one number in the password
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/[0-9]/.test(password)) {
            return false;
        }

        // If all conditions are met
        return true;
    }


    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="validateR me-3 rounded-5">
                <ul className="mt-2">
                    <li>
                        Password must contain 8 characters minimum.
                    </li>
                    <li>
                        Password must contain at least one capital letter.
                    </li>
                    <li>
                        Password must contain at least one lower letter.
                    </li>
                    <li>
                        Password must contain at least one number.
                    </li>
                    <li>
                        Nickname must be at least 3 character long.
                    </li>
                    <li>
                        Profile picture has to be a picture format.
                    </li>
                </ul>
            </div>
            <div className="registerR rounded-5">
                <UploadPic setPic={setImageSrc} image={imageSrc}/>

                <div className="textFiledR">
                    <div className="row g-2">
                        <div className="col-6">
                            <div className="textFiledR">
                                <div className="titlesR mb-2">First Name</div>
                                <UserInput
                                    icon={"bi bi-person"}
                                    type={"text"}
                                    text={"First Name"}
                                    label={"First Name"}
                                    reference={userFirstName}
                                />
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="inputUserR">
                                <div className="titlesR mb-2">Last Name</div>
                                <UserInput
                                    icon={"bi bi-person"}
                                    type={"text"}
                                    text={"Last Name"}
                                    label={"Last Name"}
                                    reference={userLastName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="titlesR mt-2"> Password</div>
                    <UserInput
                        icon={"bi bi-lock"}
                        type={"password"}
                        text={"Type Your Password"}
                        label={"password"}
                        func={handleFunc}
                        reference={passwordVal}
                    />

                    <div className="titlesR mt-2"> Confirm Password</div>
                    <div id="conDivR">
                        <UserInput
                            icon={"bi bi-lock"}
                            type={"password"}
                            text={"Type Your Password Again"}
                            label={"confirmPassword"}
                            conPass={confirmPassword}
                            func={handleConfirm}
                            reference={confirnPassword}
                        />
                    </div>

                    <div className="titlesR mt-2"> Nickname</div>
                    <UserInput
                        icon={"bi bi-person-square"}
                        type={"text"}
                        text={"Type Your Nickname"}
                        label={"nickname"}
                        reference={nickName}
                    />


                    <div className="row mt-3  d-flex align-content-center text-center justify-content-center">

                        <Link type="button" to="/" className="btn btn-secondary m-0" onClick={handleClick}>Sign
                            Up</Link>
                        <div className="d-flex align-content-center justify-content-center mt-1">
                            <small>Already registered? </small>
                        </div>
                        <div className=" ">
                            <Link to="/">
                                <small> Click here to login </small>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;