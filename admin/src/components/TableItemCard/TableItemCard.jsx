import EditFlight from '../../components/Popups/EditFlight';
import Trash from '../../assets/card/trash.svg'
import Pencil from '../../assets/card/pencil.svg'
import RemoveItem from '../Popups/RemoveItem'
import { Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import './TableItemCard.scss'


const TableItemCard = ({ children, itemId }) => {

    const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false)
    const [isEditFlightOpenPopup, setIsEditFlightOpenPopup] = useState(false)

    const removePopupHandler = () => setIsRemovePopupOpen(prev => !prev)
    const editPopupHandler = () => setIsEditFlightOpenPopup(prev => !prev)

    return (
        <>
            {isEditFlightOpenPopup ? <EditFlight title="Редактирование рейса" popupHandlerFunc={setIsEditFlightOpenPopup} /> : null}
            {isRemovePopupOpen ? (<RemoveItem itemId={itemId} title="Удаление элемента" popupHandlerFunc={setIsRemovePopupOpen}  />) : null}
            <div className="body__item">

                <div className="body__item__tools">
                    <Tooltip hasArrow label='Удалить' bg='#2c2c2c' color='#fff' placement='right'>
                        <div 
                            className="tool__item"
                            onClick={removePopupHandler}    
                        >
                            <img src={Trash} alt="Удалить" />
                        </div>
                    </Tooltip>
                    <Tooltip hasArrow label='Редактировать' bg='#2c2c2c' color='#fff' placement='right'>
                        <div 
                            className="tool__item"
                            onClick={editPopupHandler}    
                        >
                            <img src={Pencil} alt="Редактировать" />
                        </div>  
                    </Tooltip>
                    
                </div>
                {children}
            </div>
        </>
    )
}   

export default TableItemCard;