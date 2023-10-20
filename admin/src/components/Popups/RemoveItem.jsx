import { motion } from 'framer-motion'
import { endpoints } from '../../api'
import { toastSuccess, toastError } from '../../utils/toasts'
import { socket } from '../../socket.js'
import axios from 'axios'
import Popup from './Popup'
import './Popup.scss'


const RemoveItem = ({ title, popupHandlerFunc, itemId }) => {

    const cancelRemoveItem = () => popupHandlerFunc(prev => !prev)

    const removeItem = () => {
        axios.delete(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.REMOVE}/${itemId}`, {
            flightNumber: itemId
        })
        .then(res => {
            toastSuccess("Успешное удаление!")
            socket.emit('isFlightsUpdate', { status: true }) // FIXME: НЕ ОБНОВЛЯЕТ СОСТОЯНИЕ СТРАНИЦЫ
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