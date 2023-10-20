import Trash from '../../assets/card/trash.svg'
import Pencil from '../../assets/card/pencil.svg'
import RemoveItem from '../Popups/RemoveItem'
import { Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import './TableItemCard.scss'


const TableItemCard = ({ children, itemId }) => {

    const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false)

    const popupHandler = () => setIsRemovePopupOpen(prev => !prev)

    return (
        <>
            {isRemovePopupOpen ? (<RemoveItem itemId={itemId} title="Удаление элемента" popupHandlerFunc={setIsRemovePopupOpen}  />) : null}
            <div className="body__item">

                <div className="body__item__tools">
                    <Tooltip hasArrow label='Удалить' bg='#2c2c2c' color='#fff' placement='right'>
                        <div 
                            className="tool__item"
                            onClick={popupHandler}    
                        >
                            <img src={Trash} alt="Удалить" />
                        </div>
                    </Tooltip>
                    <Tooltip hasArrow label='Редактировать' bg='#2c2c2c' color='#fff' placement='right'>
                        <div className="tool__item">
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