import '../register.css'
import '../../shared_background.jpg'
import UserInput from "../UserInput/UserInput";
import React from "react";


function NameRegistration(userFirstName, userLastName, notiFirst, notiLast,
                          newUserFirstName, newUserLastName, wasNext, setWasNext) {


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

        </div>
    );
}

export default NameRegistration;