const User = require('../models/Users');
const jwt = require("jsonwebtoken");

const login = async (username, password) => {
    const user = await User.findOne({username: username, password: password});
    if (user) {
        return true;
    } else {
        return false;
    }
}



const getUser = async (token)=>{
    try {
// Verify the token is va
// lid
        const data = await jwt.verify(token, "OriItamarTalKey");
         return await User.findOne({username : data.username});
    }

    catch (error){
        return false;
    }
}

module.exports = {login,getUser}