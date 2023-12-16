import EditAdminsContent from '../EditPopupContent/EditAdminsContent'
import EditAirportsContent from '../EditPopupContent/EditAirportsContent'
import EditFlightsContent from '../EditPopupContent/EditFlightsContent'
import EditPassengersContent from '../EditPopupContent/EditPassengersContent'
import EditPlanesContent from '../EditPopupContent/EditPlanesContent'
import Popup from './Popup'
import './Popup.scss'


const EditItemContent = ({ itemCategory, data, popupHandlerFunc }) => {

    const categories = {
        'flights': <EditFlightsContent data={data} popupHandlerFunc={popupHandlerFunc} />,
        'airports': <EditAirportsContent data={data} popupHandlerFunc={popupHandlerFunc} />,
        'admins': <EditAdminsContent data={data} popupHandlerFunc={popupHandlerFunc} />,
        'passengers': <EditPassengersContent data={data} popupHandlerFunc={popupHandlerFunc} />,
        'planes': <EditPlanesContent data={data} popupHandlerFunc={popupHandlerFunc} />
    }

    return categories[itemCategory]
}

const EditItem = ({ title, popupHandlerFunc, itemCategory, data }) => {

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc} >
            <EditItemContent data={data} itemCategory={itemCategory} popupHandlerFunc={popupHandlerFunc} />
        </Popup>
    )
}

export default EditItem