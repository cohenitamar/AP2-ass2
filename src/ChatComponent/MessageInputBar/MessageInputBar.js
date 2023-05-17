import {useRef} from "react";
import messageDatabase from "../Message/MessageDatabase";

function MessageInputBar({setMessage, contactOnChat, contacts}) {
    const inputRef = useRef(null);

    const handleAddMessage = () => {
        const refName = inputRef.current.value.trim();
        if (refName.length === 0 || !contactOnChat.name) {
            return;
        }
        const newMessage = {
            message: refName,
            pic: contactOnChat.pic,
            me: true,
            date: new Date().toLocaleString()
        };
        setMessage((prev) =>
            messageDatabase[contactOnChat.name] = [...prev, newMessage]);
        inputRef.current.value = '';
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].name === contactOnChat.name) {
                contacts[i].lastMessage = refName
                contacts[i].date = newMessage.date
                break;
            }
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleAddMessage();
        }
    }

    return (
        <div className="card text-start border-0 shadow-none mt-auto">
          <span className="input-group m-0 p-0">
            <input
                className="border-0 form-control none_resize form-control-lg  bg-light rounded-0"
                placeholder="New message here..."
                defaultValue={""}
                ref={inputRef}
                onKeyPress={handleKeyPress}
            />
            <button
                className="btn btn-primary btn-lg rounded-0 border-0"
                type="button"
                id="send_message_button"
                onClick={handleAddMessage}
            >
              {""}
                <i className="bi bi-send"/>
            </button>
          </span>
        </div>
    );
}


export default MessageInputBar;