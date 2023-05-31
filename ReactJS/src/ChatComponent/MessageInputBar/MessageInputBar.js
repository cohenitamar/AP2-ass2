import {useRef} from "react";
import messageDatabase from "../Message/MessageDatabase";
import Adapters from "../../Adapters";

function MessageInputBar({setMessage, contactOnChat, setContacts, setFilter, username, token,
                             API_getChats, API_getChatsByID}) {
    const inputRef = useRef(null);

    const handleAddMessage = () => {
        const refName = inputRef.current.value.trim();
        if (refName.length === 0 || !contactOnChat.name) {
            return;
        }
        API_postMessages().then(data => {
            const newMessage= Adapters.ADAPTER_sendMessage(JSON.parse(data));
            console.log(contactOnChat["id"]);
            API_getChatsByID(contactOnChat["id"]).then(data => {
                if (data) {
                    const msg = JSON.parse(data);
                    const message = Adapters.ADAPTER_messageList(msg);
                    setMessage(message);
                    console.log(message)
                }
            });
            //setMessage((prev) =>  [...prev, newMessage]);
            API_getChats().then(data => {
                const newData = Adapters.ADAPTER_contactList(JSON.parse(data));
                console.log(newData)
                setContacts(newData);
                setFilter(newData);

            });
        })
       inputRef.current.value = '';

        /*    for (let i = 0; i < contacts.length; i++) {
               if (contacts[i].name === contactOnChat.name) {
                   contacts[i].lastMessage = refName
                   contacts[i].date = newMessage.date
                   break;
               }
           }*/
    }

    const API_postMessages = async () => {
        const data = {
            msg: inputRef.current.value.trim()
        }
        const res = await fetch(`http://localhost:5000/api/Chats/${contactOnChat.id}/Messages`, {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            },

            'body': JSON.stringify(data)

        })
        if (res.ok) {
            return res.text();
        }
        return false;
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