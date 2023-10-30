import Popup from "./Popup";

const CreateAirport = ({ title, popupHandlerFunc }) => {
    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>
            create airport
        </Popup>
    )
}

export default CreateAirport;