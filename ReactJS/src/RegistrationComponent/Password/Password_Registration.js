import '../register.css'
import '../../shared_background.jpg'
import UserInput from "../UserInput/UserInput";
import React, {useRef, useState} from "react";
import Password_Rules from "./Password_Rules";

function Password_Registration(passwordVal, confirnPassword, notiPassword, notiNick, userNickname, newUserNickname) {
    let password = "";
    let confirmPassword = "";

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



    return (


        <div className="textFiledR">
            {/*<div className="textFiledR">*/}
            <div className="titlesR mb-2">Username</div>
            <div id="nicknameDivR">
                <UserInput
                    icon={"bi bi-person"}
                    type={"text"}
                    text={"Username"}
                    label={"Nickname"}
                    reference={userNickname}
                    state={newUserNickname}
                    // onChange={(e) => (userFirstName  = e.target.value) }
                />
            </div>
            {/*</div>*/}
            <div className="nameNotification">{notiNick}</div>


            <div className="titlesR mt-2"> Password</div>
            <div id="passwordDivR">
            <UserInput
                icon={"bi bi-lock"}
                type={"password"}
                text={"Type Your Password"}
                label={"password"}
                func={handleFunc}
                reference={passwordVal}
            />
            </div>
            <br/>

            <div className="titlesR mt-2"> Confirm Password</div>
            <div id="conDivR" className="flex-grow-1">
                <div id="confirmDivR">
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
            </div>
            <div className="nameNotification">{notiPassword}</div>

        </div>

    );
}

export default Password_Registration;