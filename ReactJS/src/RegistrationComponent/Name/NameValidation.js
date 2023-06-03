

function NameValidation(userFirstName, userLastName, userNickname){
    if (userFirstName.current.value === "" || userLastName.current.value === "") {
        // event.preventDefault();
        // alert("Please type your first and last name!");
        return 1;
    }
    return 0;
}

export default NameValidation;