import '../register.css'
import '../../shared_background.jpg'
import UserInput from "../UserInput/UserInput";
import React, {useRef, useState} from "react";
import Password_Rules from "./Password_Rules";

function Password_Registration(passwordVal, confirnPassword, notiPassword) {
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
            <div className="titlesR mt-2"> Password</div>
            <UserInput
                icon={"bi bi-lock"}
                type={"password"}
                text={"Type Your Password"}
                label={"password"}
                func={handleFunc}
                reference={passwordVal}
            />
            <br/>

            <div className="titlesR mt-2"> Confirm Password</div>
            <div id="conDivR" className="flex-grow-1">
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
            <div className="nameNotification">{notiPassword}</div>

        </div>

    );
}

export default Password_Registration;