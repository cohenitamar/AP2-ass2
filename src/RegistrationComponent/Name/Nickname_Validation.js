function NickName_Validation(userNickname){
    if (userNickname.current.value.length < 3) {
        return 1;
    }
    return 0;
}

export default NickName_Validation;