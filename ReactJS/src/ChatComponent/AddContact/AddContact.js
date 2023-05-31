
function AddContact() {
    return (
        <button
            className="btn btn-lg border-0 ms-auto p-0"
            data-bs-toggle="modal"
            data-bs-target="#add_contact_modal"
            type="button"
        >
            <i className="bi bi-person-add m-0 p-0"/>
        </button>
            );
}

export default AddContact;