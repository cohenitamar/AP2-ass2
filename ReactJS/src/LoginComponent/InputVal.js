import React from 'react';
import './login.css'

function InputVal({inputType, iconType, inputRef, func, innerIcon1,innerIcon2,unseen,seen,toHide,toSee ,checkUser,checkPassword}) {



    




    if (inputType === "password") {
        return (
            <>
                <div className="input-group input-group-login flex-nowrap">
      <span className="input-group-text" id="addon-wrapping2">
        <span className="icons">
          <i className={iconType}/>
        </span>
      </span>
                    <input
                        type={inputType}
                        className="form-control inputPassword"
                        placeholder="Type Your Username"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        ref={inputRef}
                        onKeyDown={func}

                    />


                </div>

                <span ref ={unseen}>
                    <i className={innerIcon1} onClick={toSee}/></span>

                <span className="d-none" ref={seen}>
            <i className={innerIcon2} onClick={toHide}/>
        </span>
                <span className= "check d-none" ref ={checkPassword}>
                    <i className="bi bi-exclamation-circle me-1"></i>
                    Invalid Username\Password.
                    </span>

            </>

        );
    } else {


        return (
            <>
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
                <span className="check d-none" ref ={checkUser} >
                    <i className="bi bi-exclamation-circle me-1"></i>
                     This user is not registered please register first.
                    </span>
            </>
        );
    }

}

export default InputVal;




