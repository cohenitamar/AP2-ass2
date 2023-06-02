import MessageInputBar from "../MessageInputBar/MessageInputBar";
import MessagesList from "../MessagesList/MessagesList";
import empty from "../[images]/empty.png"

function ChatScreen({setMessage, contactOnChat, setContacts, setFilter,
                        contacts, username, token, message, API_getChats, API_getChatsByID}) {



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
                              message={message}/>
                {contactOnChat.name !== undefined ? <MessageInputBar
                    API_getChats={API_getChats} username={username} contactOnChat={contactOnChat}
                    setContacts={setContacts} setMessage={setMessage} API_getChatsByID={API_getChatsByID}
                    setFilter={setFilter} contacts={contacts} token={token}/> : ""}
            </div>
        </div>

    );
}


export default ChatScreen;