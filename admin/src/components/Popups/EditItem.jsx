import EditAdminsContent from '../EditPopupContent/EditAdminsContent'
import EditAirportsContent from '../EditPopupContent/EditAirportsContent'
import EditFlightsContent from '../EditPopupContent/EditFlightsContent'
import EditPassengersContent from '../EditPopupContent/EditPassengersContent'
import EditPlanesContent from '../EditPopupContent/EditPlanesContent'
import Popup from './Popup'
import './Popup.scss'


const EditItemContent = ({ itemCategory, data }) => {
    if (itemCategory == 'flights') return <EditFlightsContent data={data} />
    else if (itemCategory == 'airports') return <EditAirportsContent data={data} />
    else if (itemCategory == 'admins') return <EditAdminsContent data={data} />
    else if (itemCategory == 'passengers') return <EditPassengersContent data={data} />
    else if (itemCategory == 'planes') return <EditPlanesContent data={data} />
}

const EditItem = ({ title, popupHandlerFunc, itemCategory, data }) => {

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc} >
            <EditItemContent data={data} itemCategory={itemCategory} />
        </Popup>
    )
}

export default EditItem