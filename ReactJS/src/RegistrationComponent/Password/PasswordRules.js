
function PasswordRules() {
        return (
            <div className="d-flex justify-content-bottom align-items-center">
                <div className="validateR me-3 rounded-5">
                    <ul className="mt-2">
                        <div>
                            Password must contain:
                        </div>
                        <li>
                            8 characters minimum.
                        </li>
                        <li>
                            One capital letter and one lower letter at least.
                        </li>
                        <li>
                            One number.
                        </li>
                        <li>
                            Nickname must be at least 3 character long.
                        </li>
                        <li>
                            Profile picture has to be a picture format.
                        </li>
                    </ul>
                </div>
            </div>
        )
}

export default PasswordRules;