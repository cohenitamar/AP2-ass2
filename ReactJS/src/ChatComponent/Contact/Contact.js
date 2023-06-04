function Contact({id, username, name,  pic, lastMessage, date, onContactClick, isActive, newBadge}) {



    let className = `list-group-item m-0 p-3 list-group-item-action d-flex align-items-center contact row 
    rounded-0 fs-6 fw-bold ${isActive ? "active" : ""}`;
    return (<button
        onClick={() => {
            onContactClick(id, pic, username, name, lastMessage, date)
        }}
        className={className}
    >
        <span className="row m-0 align-items-center">
            <span className="col-3">
                <img src={pic} alt="" className="profile-image d-flex justify-content-center "/>
            </span>
             <span className="col-5 ">
                 <span className="row">
                     <small className="overflow-hidden fw-normal fw-bold text-center text-truncate">
                     {name}
                     </small>
                 </span>
                 <span className="row small">
                     <small className="fw-normal fw-bold text-center text-truncate">
                         {lastMessage}
                     </small>
                 </span>
            </span>
             <span className="small col-3 d-flex fw-bold justify-content-center fw-normal align-items-center">
                 <small className=" m-0 p-0">
                     {date}
                 </small>
            </span>
            {!isActive && newBadge[id]
                ? <span className="badge col-1 text-bg-danger d-flex justify-content-center">New</span> : ""}


            </span>
    </button>);
}


export default Contact;
