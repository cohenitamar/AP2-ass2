import '../register.css'

function UserInput( {icon , type, text, label, func,reference}){
    return(
        <div className="input-group flex-nowrap">
                    <span className="input-group-text coloringR" >
                        <span id="icons">
                            <i className={icon}></i>
                        </span>
                    </span>

            <input type={type}
                   data-bs-placement="top"
                   data-bs-title="Tooltip on top"
                   data-bs-toggle="tooltip"
                   className="form-control"
                   placeholder= {text}
                   aria-label= {label}
                   aria-describedby="addon-wrapping"
                   onInput = {func}
                   ref={reference}
            />

        </div>
    );
}

export default UserInput;