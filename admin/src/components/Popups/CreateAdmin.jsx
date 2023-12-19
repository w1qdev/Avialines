import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { isDataFilled } from "../../utils/isDataFilled.js";
import { toastError, toastSuccess } from "../../utils/toasts";
import { socket } from "../../socket.js";
import axios from "axios";
import { ChevronDownIcon } from '@chakra-ui/icons'
import Popup from "./Popup";
import { endpoints } from "../../api";

const CreateAdmin = ({ title, popupHandlerFunc }) => {
    // Всплывающее окно для создание администратора

    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        password: '',
        secretWord: ''
    })

    const createAdmin = async (e) => {
        e.preventDefault()

        const isFormDataFilled = isDataFilled(formData)

        if (isFormDataFilled) {
            toastError("Кажется, вы что-то не указали")
            return
        } 

        const jwtToken = localStorage.getItem('token')

        await axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.CREATE}`, {
            ...formData,
            role: formData.role === 'Главный администратор' ? 'mainAdmin' : 'subAdmin'
        }, {
            headers: {
                token: `Bearer ${jwtToken}`
            }
        })
        .then(res => {
            if (res.data.error) {
                toastError(res.data.error)
            } else {
                toastSuccess("Новый администратор успешно создан!")
                popupHandlerFunc(prev => !prev)
                socket.emit('isAdminsUpdate', { status: true })
            }
        })

    }

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>
            <form className="form" onSubmit={createAdmin}>
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

                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Введите пароль администратора</div>
                        <input 
                            className='input'
                            type="text" 
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Введите секретное слово</div>
                        <input 
                            type="text" 
                            placeholder='Секретное слово'
                            value={formData.secretWord}
                            onChange={e => setFormData({ ...formData, secretWord: e.target.value })} 
                        />
                    </div>
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Создать нового администратора
                    </motion.button>
                </div>
            </form>
        </Popup>
    )
}

export default CreateAdmin;