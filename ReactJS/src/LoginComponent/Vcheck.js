import './login.css'
import React from "react";

function Vcheck(){

    return(
        <div className="VCheck">
            <input
                className="myBox"
                type="checkbox"
                defaultValue="V"
                readOnly
            />
            <label>Remember Me</label>
        </div>
    );
}

export default Vcheck;