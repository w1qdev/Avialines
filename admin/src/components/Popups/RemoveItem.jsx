import { motion } from 'framer-motion'
import { toastSuccess, toastError } from '../../utils/toasts'
import { socket } from '../../socket.js'
import axios from 'axios'
import Popup from './Popup'
import { itemCategories } from '../../api/itemCategoriesApi.js'
import getSocketPathByItemCategory from '../../utils/getSocketPathByItemCategory'
import './Popup.scss'


const RemoveItem = ({ title, popupHandlerFunc, itemId, itemCategory }) => {

    const closePopupHandler = () => popupHandlerFunc(prev => !prev)
    const socketPath = getSocketPathByItemCategory(itemCategory)
    const jwtToken = localStorage.getItem('token')

    const removeItem = async () => {
        await axios.delete(`${itemCategories[itemCategory]}/${itemId}`, {
            headers: {
                token: `Bearer ${jwtToken}`
            }
        })
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)

                if (res.data.error.isRemoveAdminData !== undefined) {
                    localStorage.setItem('fullName', '')
                    localStorage.setItem('token', '')
                    localStorage.setItem('admin-type', '')
                }

                closePopupHandler()
                return
            }

            toastSuccess("Успешное удаление!")
            socket.emit(socketPath, { status: true })
            closePopupHandler()
        })
        .catch(err => {
            toastError("Что-то пошло не так, попробуйте позже")
            console.error(err)
            closePopupHandler()
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
                        onClick={closePopupHandler}
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