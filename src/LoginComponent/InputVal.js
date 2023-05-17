import React from 'react';
import './login.css'

function InputVal({inputType, iconType ,inputRef,func}) {

    return (
        <div className="input-group input-group-login flex-nowrap">
      <span className="input-group-text" id="addon-wrapping2">
        <span className="icons">
          <i className={iconType}/>
        </span>
      </span>
            <input
                type={inputType}
                className="form-control"
                placeholder="Type Your Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                ref={inputRef}
                onKeyDown={func}
            />
        </div>

    );
}

export default InputVal;




