import EditItem from '../Popups/EditItem';
import Trash from '../../assets/card/trash.svg'
import Pencil from '../../assets/card/pencil.svg'
import RemoveItem from '../Popups/RemoveItem'
import { Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './TableItemCard.scss'


const TableItemCard = ({ children, itemId, itemCategory, data }) => {
    // Компонент оболочка для создания карточек для элементов списка

    const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false)
    const [isEditOpenPopup, setIsEditOpenPopup] = useState(false)

    const removePopupHandler = () => setIsRemovePopupOpen(prev => !prev)
    const editPopupHandler = () => setIsEditOpenPopup(prev => !prev)
    
    return (
        <>  
            <AnimatePresence>
                {isEditOpenPopup ? <EditItem data={data} itemCategory={itemCategory} title="Редактирование" popupHandlerFunc={setIsEditOpenPopup} /> : null}
                {isRemovePopupOpen ? (<RemoveItem itemCategory={itemCategory} itemId={itemId} title="Удаление элемента" popupHandlerFunc={setIsRemovePopupOpen}  />) : null}
            </AnimatePresence>
            <div className="body__item">
                <div className="body__item__tools">
                    <Tooltip hasArrow label='Удалить' bg='#2c2c2c' color='#fff' placement='right'>
                        <div 
                            className="tool__item remove"
                            onClick={removePopupHandler}    
                        >
                            <img src={Trash} alt="Удалить" />
                        </div>
                    </Tooltip>
                    <Tooltip hasArrow label='Редактировать' bg='#2c2c2c' color='#fff' placement='right'>
                        <div 
                            className="tool__item edit"
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