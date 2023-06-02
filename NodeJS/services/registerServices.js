const User = require('../models/Users');


const createUser = async (username, password, displayName, profilePic) => {
    if ((username.length < 3)) {
        return -1;
    }

    if ((password))
        if (password.length < 8) {
            return -1;
        }

    // Check for at least one uppercase, one lowercase, and one number in the password
    if (!/[A-Z]/.test(password)) {
        return -1;
    }
    if (!/[a-z]/.test(password)) {
        return -1;
    }
    if (!/[0-9]/.test(password)) {
        return -1;
    }

    try {
        const user = new User({
            username: username, password: password, displayName: displayName,
            profilePic: profilePic
        })
        return await user.save();

    } catch (error) {
        return false;
    }
}


module.exports = {createUser}