import '../register.css'
import '../../shared_background.jpg'
import UserInput from "../UserInput/UserInput";
import React, {useEffect, useRef} from "react";


function Name_Registration(userFirstName, userLastName, userNickname, notiFirst, notiLast, notiNick,
                           newUserFirstName, newUserLastName, newUserNickname, wasNext, setWasNext) {


    return (
        <div className="textFiledR">

            <div className="textFiledR">
                <div className="titlesR mb-2">First Name</div>
                <div id="firstNameDivR">
                    <UserInput
                        icon={"bi bi-person"}
                        type={"text"}
                        text={"First Name"}
                        label={"First Name"}
                        reference={userFirstName}
                        wasNext={wasNext}
                        setWasNext={setWasNext}
                        state={newUserFirstName}
                        // onChange={(e) => (userFirstName  = e.target.value) }
                    />
                </div>
            </div>
            <div className="nameNotification">{notiFirst}</div>


            <div className="inputUserR">
                <div className="titlesR mb-2">Last Name</div>
                <div id="lastNameDivR">
                    <UserInput
                        icon={"bi bi-person"}
                        type={"text"}
                        text={"Last Name"}
                        label={"Last Name"}
                        wasNext={wasNext}
                        reference={userLastName}
                        state={newUserLastName}
                        setWasNext={setWasNext}
                    />
                </div>
            </div>
            <div className="nameNotification">{notiLast}</div>

            {/*<div className="textFiledR">*/}
            <div className="titlesR mb-2">Username</div>
            <div id="nicknameDivR">
                <UserInput
                    icon={"bi bi-person"}
                    type={"text"}
                    text={"Username"}
                    label={"Nickname"}
                    wasNext={wasNext}
                    reference={userNickname}
                    setWasNext={setWasNext}
                    state={newUserNickname}
                    // onChange={(e) => (userFirstName  = e.target.value) }
                />
            </div>
            {/*</div>*/}
            <div className="nameNotification">{notiNick}</div>


            {/*<button type="button" className="btn btn-secondary m-0" data-step-next>Next</button>*/}

        </div>
    );
}

export default Name_Registration;