import Message from "../Message/Message";
import React, {useRef} from "react";
import accountsDatabase from "../../LoginComponent/AccountsDatabase";
function MessagesList({message, username}){

   const messages = message.map((msg, key) => {
        return <Message {...msg} key={key} username ={username}/>
    });

    const chatBox = useRef(null);

    React.useEffect(() => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }, [message]);



    return(
        <ul className="list-group h-100 rounded-0 overflow-auto chat-background" id="chat_screen_contact" ref={chatBox}>
            {messages}
        </ul>
    );
}

export default MessagesList;