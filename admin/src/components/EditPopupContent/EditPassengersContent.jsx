import { useState } from "react";
import { isDataFilled } from "../../utils/isDataFilled";
import { motion } from 'framer-motion'
import { toastError, toastSuccess } from "../../utils/toasts";
import axios from "axios";
import { endpoints } from "../../api";
import { socket } from "../../socket";

const EditPassengersContent = ({ data, popupHandlerFunc }) => {
    // Компонент для редактирование данных выбранного пассажира

    const [formData, setFormData] = useState({...data})

    const saveChanges = (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PASSENGERS.ROUTE}${endpoints.PASSENGERS.CHANGE}`, formData)
        .then(res => {
            if (res.data.error) {
                toastError("Что-то пошло не так, данные пассажира не были изменены")
                return
            }

            toastSuccess("Данные пассажира успешно изменены")
            popupHandlerFunc(prev => !prev)
            socket.emit('isPassengersUpdate', { status: true })
        })
    }

    return (
        <form className="form" onSubmit={saveChanges}>
            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">ФИО пассажира</div>
                    <input 
                        type="text" 
                        placeholder='ФИО пассажира'
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
            </div>

            <div className="body__lower">
                <motion.button 
                    type='submit'
                    className="save"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    >Сохранить изменения
                </motion.button>
            </div>
        </form>
    )
}

export default EditPassengersContent;