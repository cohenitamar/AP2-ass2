import '../register.css'
import {useEffect, useState} from "react";

function UserInput({icon, type, text, label, func, reference, wasNext, setWasNext, state}) {


    useEffect(() => {
        if (wasNext > 0) {
            reference.current.value = state;
            setWasNext(wasNext - 1);
        }

    }, [wasNext, setWasNext]);


    return (
        <div className="input-group flex-nowrap">
                    <span className="input-group-text coloringR">
                        <span id="icons">
                            <i className={icon}></i>
                        </span>
                    </span>

            <input type={type}
                   data-bs-placement="top"
                   data-bs-title="Tooltip on top"
                   data-bs-toggle="tooltip"
                   className="form-control"
                   placeholder={text}
                   aria-label={label}
                   aria-describedby="addon-wrapping"
                   onInput={func}
                   ref={reference}
            />

        </div>
    );
}

export default UserInput;
