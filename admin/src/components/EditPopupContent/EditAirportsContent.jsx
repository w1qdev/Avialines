import { motion } from "framer-motion";
import { isDataFilled } from "../../utils/isDataFilled";
import { toastError, toastSuccess } from "../../utils/toasts";
import { endpoints } from '../../api/index';
import { socket } from "../../socket";
import axios from "axios";
import { useState } from "react";



const EditAirportsContent = ({ data, popupHandlerFunc }) => {
    // Компонент редактирования данных выбранного аэрапорта

    // Инициализация данных
    const [formData, setFormData] = useState({ ...data })

    // Обработчик событий нажатий на кнопку сохранения
    const saveChanges = async (e) => {
        e.preventDefault()

        // Проверка на заполнение всех полей формы
        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        // Объединение всех изменений
        const newAirportData = { ...formData }

        // Отправка данных на сервер
        await axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.CHANGE}`, newAirportData)
        .then(res => {
            // Обработка исключений
            if (res.data.error) {
                // Если в теле ответа от сервера есть поле error, 
                // то есть ошибка, показываем эту ошибку администратору 
                toastError(res.data.error)
            } else {
                // Иначе, выводим сообщение с успешным регистрированием администратора
                toastSuccess("Данные Аэрапорта успешно изменены!")
                popupHandlerFunc(prev => !prev)
                // Обновление данных на странице
                socket.emit('isAirportsUpdate', { status: true })
            }
        })
        .catch(err => {
            // Если произошла какая-то клиентская ошибка, то выводим
            // предупреждение об ошибке
            console.log(err)
            toastError("Что-то пошло не так, попробуйте позже")
        })
    }
    
    return (
        <form className="form" onSubmit={saveChanges}>
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