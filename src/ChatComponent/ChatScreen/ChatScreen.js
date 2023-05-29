import MessageInputBar from "../MessageInputBar/MessageInputBar";
import MessagesList from "../MessagesList/MessagesList";
import messageDatabase from "../Message/MessageDatabase";
import empty from "../[images]/empty.png"

function ChatScreen({setMessage, contactOnChat, contacts, username, token}) {



    return (
        <div className="col-12 col-md-6 col-lg-8 p-0 h-100" id="chatContainer">
            <div className="card h-100 rounded-0 bg-light">
        <span className="card-header top-bar m-0 row d-flex align-items-center fw-bold fs-5 rounded-start-0">
          <span className="col-6  d-inline-block text-truncate">
            <img className="profile-image me-2" src={contactOnChat.pic ? contactOnChat.pic : empty} alt=""/>
              {contactOnChat.name}
          </span>
        </span>
                <MessagesList username={username}
                              message={messageDatabase[contactOnChat['name']] ?
                                  messageDatabase[contactOnChat['name']]: []}/>
                {contactOnChat.name !== undefined ? <MessageInputBar contactOnChat={contactOnChat}
                                                                     setMessage={setMessage}
                                                                     contacts={contacts}/> : ""}
            </div>
        </div>

    );
}


export default ChatScreen;