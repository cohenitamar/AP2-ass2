import accountsDatabase from "../../LoginComponent/AccountsDatabase";
import {useState} from "react";

function Profile({username, token}) {
    const [user, setUser] = useState({
        "username": "",
        "displayName": "",
        "profilePic": ""
    });
    /// get user by username
/*    {
        "username": "string",
        "displayName": "string",
        "profilePic": "string"
    }*/


    const foo = async () => {
        const res = await fetch(`http://localhost:5000/api/Users/${username}`, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
        setUser(await res.json());
    }


    foo();
    return (
        <span className="text-truncate">
             <img className="profile-image me-2 " src={user["profilePic"]} alt=""/>
            {user["displayName"]}
        </span>
    );
}

export default Profile;