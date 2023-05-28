import accountsDatabase from "../../LoginComponent/AccountsDatabase";
import {useState} from "react";

function Profile({username}) {
    return (
        <span className="text-truncate">
             <img className="profile-image me-2 " src={user["profilePic"]} alt=""/>
            {user["displayName"]}
        </span>
    );
}

export default Profile;