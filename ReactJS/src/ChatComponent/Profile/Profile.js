import {useEffect, useState} from "react";

function Profile({username, token}) {
    const [user, setUser] = useState({
        "username": "",
        "displayName": "",
        "profilePic": ""
    });


    useEffect(() => {
    const foo = async () => {
        const res = await fetch(`http://localhost:5000/api/Users/${username}`, {
            'method': 'get',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        setUser(await res.json());
    }
    foo();
    }, [username]);
    return (
        <span className="text-truncate">
             <img className="profile-image me-2 " src={user["profilePic"]} alt=""/>
            {user["displayName"]}
        </span>
    );
}

export default Profile;