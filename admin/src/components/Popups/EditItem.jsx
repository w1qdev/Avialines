import EditAdminsContent from '../EditPopupContent/EditAdminsContent'
import EditAirportsContent from '../EditPopupContent/EditAirportsContent'
import EditFlightsContent from '../EditPopupContent/EditFlightsContent'
import EditPassengersContent from '../EditPopupContent/EditPassengersContent'
import EditPlanesContent from '../EditPopupContent/EditPlanesContent'
import Popup from './Popup'
import './Popup.scss'


const EditItemContent = ({ itemCategory, data }) => {
    const categories = {
        'flights': <EditFlightsContent data={data} />,
        'airports': <EditAirportsContent data={data} />,
        'admins': <EditAdminsContent data={data} />,
        'passengers': <EditPassengersContent data={data} />,
        'planes': <EditPlanesContent data={data} />
    }

    return categories[itemCategory]
}

const EditItem = ({ title, popupHandlerFunc, itemCategory, data }) => {

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc} >
            <EditItemContent data={data} itemCategory={itemCategory} />
        </Popup>
    )
}

export default EditItem