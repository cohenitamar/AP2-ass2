

function Message({message, date, pic,me, username}) {


    if (me === username) {

        return (
            <div className="list-group-item d-flex flex-row bg-transparent border-0 p-0 justify-content-start">
                <img
                    className="profile-image m-1 p-0"
                    src={pic[me]}
                    alt=""
                />
                <div className="text-break">
                    <p className="small d-flex justify-content-left p-2 m-2 ms-1 rounded-3 text-white shadow-lg bg-primary">
                        {message}
                    </p>
                    <p className="small d-flex justify-content-left ms-1 p-0 rounded-3 text-black">
                        {date}
                    </p>
                </div>
            </div>

        );
    }
    else{
        return (
            <div className="list-group-item d-flex flex-row bg-transparent border-0 p-0 justify-content-end">
                <div className="text-break">
                    <p className="small d-flex justify-content-end p-2 m-2 me-1 rounded-3  shadow-lg bg-light">
                        {message}
                    </p>
                    <p className="small d-flex justify-content-end me-1 p-0 rounded-3 text-black">
                        {date}
                    </p>
                </div>
                <img className="profile-image m-1 p-0" alt="" src={pic[me]}/>
            </div>

        );

    }

}


export default Message;