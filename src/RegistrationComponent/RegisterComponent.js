import './register.css'
import '../shared_background.jpg'
import UploadPic from "./UploadPic/UploadPic";
import React, {useRef, useState} from 'react';
import user from "./UploadPic/user.png";
import Name_Registration from "./Name/Name_Registration";
import Password_Registration from "./Password/Password_Registration";
import Name_Validation from "./Name/Name_Validation";
import password_Validation from "./Password/Password_Validation";
import Password_Rules from "./Password/Password_Rules";
import {Link} from "react-router-dom";


function RegisterComponent() {
    const userFirstName = useRef(null);
    const userLastName = useRef(null);
    const userNickname = useRef(null);
    const passwordVal = useRef(null);
    const confirmPassword = useRef(null);

    // const [user, setUser] = useState({first: "",last: "", password: "", nick: "" });
    const [newUserNickname, setNewUserNickname] = useState("");
    const [newUserFirstName, setNewUserFirstName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");


    const [imageSrc, setImageSrc] = useState(user);
    const [currentStep, setCurrentStep] = useState(1);
    const [notiFirst, setNotiFirst] = useState(<br/>);
    const [notiLast, setNotiLast] = useState(<br/>);
    const [notiNick, setNotiNick] = useState(<br/>);
    const [notiPassword, setNotPassword] = useState(<br/>);


    const [showPasswordRules, setShowPasswordRules] = useState(null);


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

    function changeNameColor(firstName, lastName, nickname) {
        checkAndChange(firstName, "firstNameDivR", setNotiFirst);
        checkAndChange(lastName, "lastNameDivR", setNotiLast);
        checkAndChange(nickname, "nicknameDivR", setNotiNick);
    }

    const handleNext = () => {
        let isNameValid = 1;
        let isPasswordValid = 1;
        if (currentStep === 1) {
            isNameValid = Name_Validation(userFirstName, userLastName, userNickname);
            if (isNameValid === 0) {

                setNewUserFirstName(userFirstName.current.value || "");
                setNewUserLastName(userLastName.current.value || "");
                setNewUserNickname(userNickname.current.value || "");

                setCurrentStep((prevStep) => prevStep + 1);
                changeNameColor(userFirstName, userLastName, userNickname);
            } else {
                changeNameColor(userFirstName, userLastName, userNickname);
            }
        } else if (currentStep === 2) {
            isPasswordValid = password_Validation(passwordVal, confirmPassword, notiPassword);
            if (isPasswordValid === 0) {
                setNewUserPassword(passwordVal.current.value || "");
                setCurrentStep((prevStep) => prevStep + 1);
            } else {
                setNotPassword("* Invalid password");
            }
        }

    };
    const handlePrevious = () => {

        setCurrentStep((prevStep) => prevStep - 1);

    };
    const showStep = () => {
        switch (currentStep) {
            case 1:
                return Name_Registration(userFirstName, userLastName, userNickname, notiFirst, notiLast, notiNick, newUserFirstName, newUserLastName, newUserNickname);
            case 2:
                return (
                    <>
                        {Password_Registration(passwordVal, confirmPassword, notiPassword)}
                        {
                            <div className="tooltipStyle">
                                <div className="bi bi-question-circle-fill"
                                     data-bs-toggle="tooltip"
                                     data-bs-placement="left"
                                     onMouseEnter={showRules}
                                     onMouseLeave={unshowRules}>
                                    <span className="tooltip-logo"></span> What is a valid password?
                                </div>
                            </div>
                        }
                    </>
                );
            case 3:

                return <div>
                    <div> Thank you for joining us, {newUserNickname} ! </div>
                    <Link to="/">
                        To Login
                </Link>
                </div>


            default:
                return null;
        }
    };

    function showRules() {
        setShowPasswordRules(<Password_Rules/>);
    }

    function unshowRules() {
        setShowPasswordRules(null);
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
                        <UploadPic setPic={setImageSrc} image={imageSrc}/></div>)
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
                            <button type="button" className="btn bi bi-arrow-right nextButt mb-3 m-0" onClick={handleNext}>
                                <span className="arrowIcon"></span>
                                Next
                            </button>
                        )}
                        {currentStep === 2 && (
                            <button type="button" className="btn bi bi bi-check-lg signUpButt mb-3 m-0" onClick={handleNext}>
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