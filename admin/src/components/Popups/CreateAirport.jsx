import { useState } from "react";
import { motion } from "framer-motion";
import { toastError, toastSuccess } from "../../utils/toasts";
import { isDataFilled } from "../../utils/isDataFilled";
import axios from "axios";
import Popup from "./Popup";
import { socket } from "../../socket";
import { endpoints } from "../../api";

const CreateAirport = ({ title, popupHandlerFunc }) => {
    // Всплывающее окно для создания аэрапорта

    const [formData, setFormData] = useState({
        airportName: '',
        airportPlace: ''      
    })

    const createAirport = async (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.CREATE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
                return
            }

            toastSuccess("Аэропорт успешно добавлен")
            popupHandlerFunc(prev => !prev)
            socket.emit('isAirportsUpdate', { status: true })
        })
    }

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>

            <form className="form" onSubmit={createAirport}>
                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Введите название аэропорта</div>
                        <input 
                            className='input'
                            type="text" 
                            placeholder="Название аэропорта"
                            value={formData.airportName}
                            onChange={e => setFormData({ ...formData, airportName: e.target.value })}
                        />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Введите местоположение аэропорта (город)</div>
                        <input 
                            type="text" 
                            placeholder='Местоположение аэропорта'
                            value={formData.airportPlace}
                            onChange={e => setFormData({ ...formData, airportPlace: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Добавить новый аэропорт
                    </motion.button>
                </div>
            </form>

        </Popup>
    )
}

export default CreateAirport;