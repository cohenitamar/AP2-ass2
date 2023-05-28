import '../register.css'
import '../../shared_background.jpg'
import UserInput from "../UserInput/UserInput";
import React, {useRef} from "react";




function Name_Registration(userFirstName, userLastName, userNickname, notiFirst, notiLast, notiNick, newUserFirstName, newUserLastName, newUserNickname) {

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
                            string={newUserFirstName}
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
                            reference={userLastName}
                        />
                </div>
            </div>
            <div className="nameNotification">{notiLast}</div>

            {/*<div className="textFiledR">*/}
                <div className="titlesR mb-2">Nickname</div>
                <div id="nicknameDivR">
                    <UserInput
                        icon={"bi bi-person"}
                        type={"text"}
                        text={"Nickname"}
                        label={"Nickname"}
                        reference={userNickname}
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