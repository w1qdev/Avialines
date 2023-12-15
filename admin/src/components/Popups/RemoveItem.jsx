import { motion } from 'framer-motion'
import { toastSuccess, toastError } from '../../utils/toasts'
import { socket } from '../../socket.js'
import axios from 'axios'
import Popup from './Popup'
import { itemCategories } from '../../api/itemCategoriesApi.js'
import getSocketPathByItemCategory from '../../utils/getSocketPathByItemCategory'
import './Popup.scss'


const RemoveItem = ({ title, popupHandlerFunc, itemId, itemCategory }) => {
    
    const cancelRemoveItem = () => popupHandlerFunc(prev => !prev)
    const socketPath = getSocketPathByItemCategory(itemCategory)

    const removeItem = async () => {
        await axios.delete(`${itemCategories[itemCategory]}/${itemId}`, {
            itemId
        })
        .then(res => {
            toastSuccess("Успешное удаление!")
            socket.emit(socketPath, { status: true })
            cancelRemoveItem()
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
            cancelRemoveItem()
        })
    }

    return (
        <Popup
            title={title}
            popupHandlerFunc={popupHandlerFunc}
        >
            <div className="remove-item">
                <div className="remove-item__info">Вы действительно хотите это удалить?</div>
                <div className="remove-item__buttons">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='button cancel'
                        onClick={cancelRemoveItem}
                        >Отмена
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='button remove'
                        onClick={removeItem}
                        >Удалить
                    </motion.button>
                </div>
            </div>
        </Popup>
    )
}


export default RemoveItem