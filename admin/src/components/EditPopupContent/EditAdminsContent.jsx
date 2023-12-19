import { motion } from "framer-motion";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { toastError, toastSuccess } from "../../utils/toasts";
import { endpoints } from "../../api";
import { isDataFilled } from "../../utils/isDataFilled";
import { socket } from "../../socket";
import { useState, useRef } from "react";
import './EditContent.scss'
import axios from "axios";


const EditAdminsContent = ({ data, popupHandlerFunc }) => {
    // Компонент редактирования данных выбранного админа 

    // Инициализация данных
    const submitButton = useRef()

    console.log(submitButton.current)
    
    const [formData, setFormData] = useState({
        ...data,
        role: data.role === 'mainAdmin' ? 'Главный администратор' : 'Администратор'
    })

    // Обработка события сохранения данных администратора
    const saveChanges = async (e) => {
        e.preventDefault()

        // Проверка на заполнение всех полей формы
        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        }

        // объединения всех изменений
        const newAdminData = { ...formData }

        // Отправка на сервер измененных данных администратора
        await axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CHANGE}`, newAdminData)
        .then(res => {
            // Проверка на наличие ошибок от сервера
            if (res.data.error) {
                // Если в теле ответа от сервера находится поле error, то есть
                // что-то пошло не так, то выводим эту ошибку администратору
                toastError(res.data.error)
            } else {
                // Если все хорошо, то выводим сообщение с успешным 
                // изменением данных
                toastSuccess("Данные администратора успешно изменены!")
                popupHandlerFunc(prev => !prev)
                // Обновляем данные страницы
                socket.emit('isAdminsUpdate', { status: true })
            }
        })
    }

    // HTML структура компонента 
    return (
        <form className="form" onSubmit={saveChanges}>
            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">ФИО Администратора</div>
                    <input 
                        type="text" 
                        placeholder='Фамилия Имя Отчество'
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className="item">
                    <div className="body__input__title">Уровень (роль)</div>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            width={'100%'}
                            height={'47px'}
                            borderRadius={'8px'}
                            fontWeight={'500'}
                            >
                            {formData.role ? formData.role : "Список ролей"}
                        </MenuButton>
                        <MenuList 
                            overflow={'auto'}
                            maxHeight={'230px'}
                            >
                                <MenuItem onClick={() => setFormData({...formData, role: "Главный администратор"})}>Главный администратор</MenuItem>
                                <MenuItem onClick={() => setFormData({...formData, role: "Администратор"})}>Администратор</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>

            <div className="body__lower">
                <motion.button 
                    type='submit'
                    className="save"
                    ref={submitButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.3 }}
                    >Сохранить изменения
                </motion.button>
            </div>
        </form>
    )
}

// Экспорт компонента
export default EditAdminsContent;