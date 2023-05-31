const User = require('../models/Users');


const createUser = async (username, password, displayName, profilePic) => {
    if ((username.length < 3)) {
        return false;
    }

    if ((password))
        if (password.length < 8) {
            return false;
        }

    // Check for at least one uppercase, one lowercase, and one number in the password
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/[0-9]/.test(password)) {
        return false;
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