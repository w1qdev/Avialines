import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { endpoints } from "../../api";
import axios from "axios";
import { motion } from "framer-motion";
import { socket } from "../../socket";
import { useState } from "react";
import { toastError, toastSuccess } from "../../utils/toasts";

const EditPlanesContent = ({ data, popupHandlerFunc }) => {
    // Компонент для редактирования выбранного самолета

    const [formData, setFormData] = useState({
        ...data,
        status: data.status === 'free' ? "Свободен" : "Занят (в рейсе)"
    })

    const saveChanges = async (e) => {
        e.preventDefault()

        const newPlaneData = {
            ...formData,
            status: formData.status === 'Свободен' ? 'free' : 'busy'
        }

        await axios.put(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.CHANGE}`, newPlaneData)
        .then(res => {
            toastSuccess("Изменения успешно сохранены!")
            popupHandlerFunc(prev => !prev)
            socket.emit('isPlanesUpdate', { status: true })
        })
        .catch(err => {
            console.log(err)
            toastError('Не удалось сохранить изменения')
        })
    }

    return (
        <form className="form" onSubmit={saveChanges}>
            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">Название самолета</div>
                    <input 
                        type="text" 
                        placeholder='Название самолета'
                        value={formData.planeType}
                        onChange={e => setFormData({ ...formData, planeType: e.target.value })}
                    />
                </div>
                <div className="item">
                    <div className="body__input__title">Количество мест</div>
                    <input 
                        type="number" 
                        placeholder='Количество мест'
                        value={formData.seatCount}
                        onChange={e => setFormData({ ...formData, seatCount: e.target.value })}
                    />
                </div>
            </div>

            <div className="body__input">
                <div className="item">
                    <div className="body__input__title">Статус самолета</div>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<ChevronDownIcon />}
                            width={'100%'}
                            height={'47px'}
                            borderRadius={'8px'}
                            fontWeight={'500'}
                            >
                            {formData.status ? formData.status : "Список статусов"}
                        </MenuButton>
                        <MenuList 
                            overflow={'auto'}
                            maxHeight={'230px'}
                            >
                                <MenuItem onClick={() => setFormData({...formData, status: "Свободен"})}>Свободен</MenuItem>
                                <MenuItem onClick={() => setFormData({...formData, status: "Занят (в рейсе)"})}>Занят (в рейсе)</MenuItem>
                        </MenuList>
                    </Menu>
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

export default EditPlanesContent;