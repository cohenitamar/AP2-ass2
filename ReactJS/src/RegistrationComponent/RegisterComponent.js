import './register.css'
import '../shared_background.jpg'
import UploadPic from "./UploadPic/UploadPic";
import React, {useRef, useState} from 'react';
import Name_Registration from "./Name/Name_Registration";
import Password_Registration from "./Password/Password_Registration";
import Name_Validation from "./Name/Name_Validation";
import password_Validation from "./Password/Password_Validation";
import Password_Rules from "./Password/Password_Rules";
import {Link} from "react-router-dom";
import accountsDatabase from "../LoginComponent/AccountsDatabase";
import easter from "./UploadPic/easter_egg.png";
import Nickname_Validation from "./Name/Nickname_Validation";
import noPictureUserr from "./UploadPic/noPictureUserr.png"


function RegisterComponent() {
    const userFirstName = useRef(null);
    const userLastName = useRef(null);
    const userNickname = useRef(null);
    const passwordVal = useRef(null);
    const confirmPassword = useRef(null);
    const [rules, setRules] = useState(false);

    // const [user, setUser] = useState({first: "",last: "", password: "", nick: "" });
    const [newUserNickname, setNewUserNickname] = useState("");
    const [newUserFirstName, setNewUserFirstName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [wasNext, setWasNext] = useState(0);


    const [imageSrc, setImageSrc] = useState(noPictureUserr);
    const [currentStep, setCurrentStep] = useState(1);
    const [notiFirst, setNotiFirst] = useState(<br/>);
    const [notiLast, setNotiLast] = useState(<br/>);
    const [notiNick, setNotiNick] = useState(<br/>);
    const [notiPassword, setNotPassword] = useState(<br/>);


    const [showPasswordRules, setShowPasswordRules] = useState(null);

    function handleClick(event) {
        foo().then(data => {
            if(data){
                setNotiNick(<br/>);
                setCurrentStep(currentStep +1);
            } else{
                setNotiNick("* User already exists");
            }
        })
    }

    const foo = async () => {
        const data = {
            username: userNickname.current.value,
            password: passwordVal.current.value,
            displayName: newUserFirstName + " " + newUserLastName,
            profilePic: !imageSrc.startsWith("data:image/") || imageSrc === "/static/media/user.4eddcc79e0488c03d196.png" ?
                easter : imageSrc
        }
        console.log(data)
        const res = await fetch('http://localhost:5000/api/Users', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(data)
        })
        //returns true or false
        return res.ok;
    }

    function checkAndChange(element, id, setNotification) {
        if (element.current.value === "") {
            let elementBox = document.getElementById(id)
            elementBox.classList.add("rounded-2");
            elementBox.style.boxShadow = "0 0 0 0.15rem red"
            elementBox.style.borderColor = "green";
            setNotification("* Please Fill")
        } else {
            let elementBox = document.getElementById(id)
            elementBox.classList.remove("rounded-2");
            elementBox.style.boxShadow = "none";
            setNotification(<br/>);
        }
    }

    function changeNameColor(firstName, lastName) {
        checkAndChange(firstName, "firstNameDivR", setNotiFirst);
        checkAndChange(lastName, "lastNameDivR", setNotiLast);
    }

    function changeColor(id) {
        let elementBox = document.getElementById(id)
        elementBox.classList.add("rounded-2");
        elementBox.style.boxShadow = "0 0 0 0.15rem red"
        elementBox.style.borderColor = "green";
    }

    function cancelColor(id, setNotification){
            let elementBox = document.getElementById(id)
            elementBox.classList.remove("rounded-2");
            elementBox.style.boxShadow = "none";
            setNotification(<br/>);
        }

    //TODO: ADD VALIDATION TO NICKNAME IN THE PASSWORD PAGE
    const handleNext = () => {
        let isNameValid = 1;
        let isPasswordValid = 1;
        let isNickValid = 1;
        if (currentStep === 1) {
            isNameValid = Name_Validation(userFirstName, userLastName);
            if (isNameValid === 0) {
                setNewUserFirstName(userFirstName.current.value || "");
                setNewUserLastName(userLastName.current.value || "");
                setCurrentStep((prevStep) => prevStep + 1);
                changeNameColor(userFirstName, userLastName);
            } else {
                changeNameColor(userFirstName, userLastName);
            }
        } else if (currentStep === 2) {
            isPasswordValid = password_Validation(passwordVal, confirmPassword, notiPassword, userNickname, notiNick);
            isNickValid = Nickname_Validation(userNickname);
            if((isPasswordValid === 0) && (isNickValid === 0)){
                setNewUserPassword(passwordVal.current.value || "");
                // cancelColor("nickNameDivR", setNotiNick);
                // cancelColor("confirmDivR", setNotPassword);
                handleClick();
                // setCurrentStep((prevStep) => prevStep + 1);
            }else {
                if(isNickValid === 1){
                    changeColor("nicknameDivR", setNotiNick);
                    setNotiNick("* Nickname needs to be at least 3 letters long");
                }else{
                    cancelColor("nicknameDivR", setNotiNick);
                }
                if(isPasswordValid === 1){
                    changeColor("confirmDivR");
                    setNotPassword("* Invalid password");
                }else{
                    cancelColor("confirmDivR", setNotPassword);
                }
            }
        }
    };

    const handlePrevious = () => {
        setRules(false);
        setShowPasswordRules(null);
        setWasNext(3);
        setCurrentStep((prevStep) => prevStep - 1);


    };
    const showStep = () => {
        switch (currentStep) {
            case 1:
                return Name_Registration(userFirstName, userLastName, notiFirst, notiLast,
                    newUserFirstName, newUserLastName, wasNext, setWasNext);
            case 2:
                return (
                    <>
                        {Password_Registration(passwordVal, confirmPassword, notiPassword, notiNick, userNickname, newUserNickname)}
                        {
                            <div className="tooltipStyle">
                                <div className="bi bi-question-circle-fill"
                                     data-bs-toggle="tooltip"
                                     data-bs-placement="left"
                                    ///TODO need to make a condition like
                                    ///TODO {condition === state ? showRules : unshowRules}
                                     onClick={showRules}>
                                    <span className="tooltip-logo"></span> What is a valid password?
                                </div>
                            </div>
                        }
                    </>
                );
            case 3:

                return <div>
                    <div> Thank you for joining us, {userNickname.current.value} !</div>
                    <Link to="/">
                        To Login
                    </Link>
                </div>


            default:
                return null;
        }
    };

    function showRules() {
        setRules(!rules)
        rules ? setShowPasswordRules(<Password_Rules/>) : setShowPasswordRules(null);
    }


    const setPage = () => {
        document.getElementById("bodyOfIndex").classList.remove("bodyChat");
        document.getElementById("bodyOfIndex").classList.remove("bodyLogin");
        document.getElementById("root").classList.remove("h-100");
        document.getElementById("root").classList.remove("overflow-hidden");

        document.getElementById("root").classList.remove("m-0");
        document.getElementById("root").classList.remove("p-0");
        document.getElementById("htmlOfIndex").classList.remove("d-flex");
        document.getElementById("htmlOfIndex").classList.remove("justify-content-center");

        document.getElementById("bodyOfIndex").classList.add("bodyRegister");
        document.getElementById("bodyOfIndex").classList.add("row");
        document.getElementById("bodyOfIndex").classList.add("overflow-x-hidden");

    }

    setPage();


    return (
        <div className="d-flex justify-content-center align-items-center">
            {/*{<Password_Rules ifToShow = {true}> </Password_Rules>}*/}
            {showPasswordRules}
            <div className="registerR rounded-5">
                {currentStep < 3 && (
                    <div className="headerR mb-2 fw-bold joinClassR"> Join Us!</div>)
                }
                {currentStep <= 3 && (
                    <div>
                        <UploadPic setPic={setImageSrc} image={imageSrc} currentLevel={currentStep}/></div>)
                }

                {showStep()}

                <div className="textFiledR ">

                    {/*<div className="row mt-3 d-flex align-items-center justify-content-between row-buttons">*/}
                    <div className="mt-3 d-flex align-items-center row-buttons">

                        {currentStep > 1 && currentStep < 3 && (
                            <div className="col text-start mb-3">
                                <button type="button" className=" btn bi bi-arrow-left nextButt m-0 "
                                        onClick={handlePrevious}>
                                    Previous
                                </button>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div className="col text-start mb-3">
                                <Link type="button" to="/" className=" btn bi bi-arrow-left nextButt m-0 ">
                                    Login
                                </Link>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <button type="button" className="btn bi bi-arrow-right nextButt mb-3 m-0"
                                    onClick={handleNext}>
                                <span className="arrowIcon"></span>
                                Next
                            </button>
                        )}
                        {currentStep === 2 && (
                            <button type="button" className="btn bi bi bi-check-lg signUpButt mb-3 m-0"
                                    onClick={handleNext}>
                                <span className="signUpIcon"></span>
                                SignUp
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;