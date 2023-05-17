import accountsDatabase from "../../LoginComponent/AccountsDatabase";

function Profile({username}) {
    return (
        <span className="text-truncate">
             <img className="profile-image me-2 " src={accountsDatabase[username]['pic']} alt=""/>
            {accountsDatabase[username]['first_name'] + " " + accountsDatabase[username]['last_name'] }
        </span>
    );
}

export default Profile;