import Popup from "./Popup";

const CreateAdmin = ({ title, popupHandlerFunc }) => {
    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>
            create admin
        </Popup>
    )
}

export default CreateAdmin;