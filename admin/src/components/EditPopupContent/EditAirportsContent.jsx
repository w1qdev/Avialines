import { motion } from "framer-motion";
import { isDataFilled } from "../../utils/isDataFilled";
import { toastError, toastSuccess } from "../../utils/toasts";
import { endpoints } from '../../api/index';
import { socket } from "../../socket";
import axios from "axios";
import { useState } from "react";



const EditAirportsContent = ({ data, popupHandlerFunc }) => {

    const [formData, setFormData] = useState({...data})

    const saveChanges = async (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        const newAirportData = { ...formData }

        await axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.CHANGE}`, newAirportData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
            } else {
                toastSuccess("Данные Аэрапорта успешно изменены!")
                popupHandlerFunc(prev => !prev)
                socket.emit('isAirportsUpdate', { status: true })
            }
        })
        .catch(err => {
            console.log(err)
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }
    
    return (
        <form className="form">
            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">Название аэрапорта</div>
                    <input 
                        type="text" 
                        placeholder='Название аэрапорта'
                        value={formData.airportName}
                        onChange={e => setFormData({ ...formData, airportName: e.target.value })}
                    />
                </div>
                <div className="item">
                    <div className="body__input__title">Местоположение аэрапорта (Страна, город)</div>
                    <input 
                        type="text" 
                        placeholder='Местоположение аэрапорта'
                        value={formData.airportPlace}
                        onChange={e => setFormData({ ...formData, airportPlace: e.target.value })}
                    />
                </div>
            </div>

            <div className="body__lower">
                <motion.button 
                    type='submit'
                    className="save"
                    onClick={saveChanges}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    >Сохранить изменения
                </motion.button>
            </div>
        </form>
    )
}

export default EditAirportsContent;