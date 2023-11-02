import EditAdminsContent from '../EditPopupContent/EditAdminsContent'
import EditAirportsContent from '../EditPopupContent/EditAirportsContent'
import EditFlightsContent from '../EditPopupContent/EditFlightsContent'
import EditPassengersContent from '../EditPopupContent/EditPassengersContent'
import EditPlanesContent from '../EditPopupContent/EditPlanesContent'
import Popup from './Popup'
import './Popup.scss'


const EditItemContent = ({ itemCategory }) => {
    if (itemCategory == 'flights') return <EditFlightsContent />
    else if (itemCategory == 'airports') return <EditAirportsContent />
    else if (itemCategory == 'admins') return <EditAdminsContent />
    else if (itemCategory == 'passengers') return <EditPassengersContent />
    else if (itemCategory == 'planes') return <EditPlanesContent />
}

const EditItem = ({ title, popupHandlerFunc, itemCategory }) => {

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc} >
            <EditItemContent itemCategory={itemCategory} />
        </Popup>
    )
}

export default EditItem