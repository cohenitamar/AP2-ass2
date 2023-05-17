import '../register.css'

function UploadPic({image, setPic}) {

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPic(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className="mt-2">
            <div className="headerR mb-2 fw-bold joinClassR"> Join Us!</div>
            <div className="upload-container">
                <label htmlFor="file-upload" className="upload-label">
                    <img src={image}
                         alt=""
                         className="profile-image-register mb-3"
                    />
                </label>
                <input id="file-upload"
                       type="file"
                       className="upload-inputR"
                       accept="image/*"
                       onChange={handleImageUpload}
                />
            </div>
        </div>
    );
}

export default UploadPic;