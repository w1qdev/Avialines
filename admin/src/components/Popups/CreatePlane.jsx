import './Popup.scss'
import Popup from './Popup'
import { useState } from 'react'
import { isDataFilled } from '../../utils/isDataFilled'
import { toastError, toastSuccess } from '../../utils/toasts'
import axios from 'axios'
import { socket } from '../../socket'
import { motion } from 'framer-motion'
import { endpoints } from '../../api'


const CreatePlane = ({ title, popupHandlerFunc }) => {
    // Всплывающее окно для создания самолета

    const [formData, setFormData] = useState({
        planeType: '',
        seatCount: '',
        planeCompany: '',
    })

    const formOnChangeHandler = async (e, name) => {
        setFormData({...formData, [name]: e.target.value})
    }

    const createPlane = async (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        }

        if (parseInt(formData.seatCount) > 168) {
            toastError("Количество мест превышает 168!")
            return
        }

        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.FLIGHTS.CREATE}`, formData)
        .then(res => {
            toastSuccess("Данные самолета успешно сохранены")
            popupHandlerFunc(prev => !prev)
            socket.emit('isPlanesUpdate', { status: true })
        })
        .catch(err => {
            console.error(err)
            toastError("Не удалось создать новый самолет, попробуйте позже")
        })
    }

    return (
        <Popup 
            title={title} 
            popupHandlerFunc={popupHandlerFunc}
        >
            <div className="form" onSubmit={createPlane}>
                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Название самолета</div>
                        <input 
                            type="text" 
                            placeholder='Название самолета' 
                            value={formData.planeType}
                            onChange={e => formOnChangeHandler(e, 'planeType')}
                        />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Вмещаемое количестов мест</div>
                        <input 
                            type="number" 
                            placeholder='Количество мест' 
                            value={formData.seatCount}
                            onChange={e => formOnChangeHandler(e, 'seatCount')}
                        />
                    </div>
                </div>

                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Название компании</div>
                        <input 
                            type="text" 
                            placeholder='Название компании' 
                            value={formData.planeCompany}
                            onChange={e => formOnChangeHandler(e, 'planeCompany')}
                        />
                    </div>
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        onClick={createPlane}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Добавить самолет   
                    </motion.button>
                </div>
            </div>
        </Popup>
    )
}

export default CreatePlane