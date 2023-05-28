function validate(password) {
    // Check for username length


    // Check for password length
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

    // If all conditions are met
    return true;
}

function Password_Validation(passwordVal, confirnPassword) {

    if (!(validate(passwordVal.current.value))) {
        // event.preventDefault();
        return 1;
    } else if (passwordVal.current.value !== confirnPassword.current.value) {
        // event.preventDefault();
        alert("Passwords don't match!");
        return 1;
    }
    return 0;
}

export default Password_Validation;


