import ChatPage from "./ChatPage/ChatPage";
import React from "react";


function ChatComponent({username}) {

    const setPage = () => {

        document.getElementById("bodyOfIndex").classList.add("bodyChat");
        document.getElementById("root").classList.add("h-100");
        document.getElementById("root").classList.add("m-0");
        document.getElementById("root").classList.add("p-0");
        document.getElementById("htmlOfIndex").classList.add("d-flex");
        document.getElementById("htmlOfIndex").classList.add("justify-content-center");

        document.getElementById("bodyOfIndex").classList.remove("bodyRegister");
        document.getElementById("bodyOfIndex").classList.remove("bodyLogin");
        document.getElementById("bodyOfIndex").classList.remove("row");
        document.getElementById("bodyOfIndex").classList.remove("overflow-x-hidden");

        }

    setPage();
    return (
        <div className="h-100 d-flex justify-content-center">
            <ChatPage username={username}/>
        </div>
    );
}

export default ChatComponent;