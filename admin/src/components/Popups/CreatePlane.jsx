import './Popup.scss'
import Popup from './Popup'
import { useState } from 'react'
import { isDataFilled } from '../../utils/isDataFilled'
import axios from 'axios'
import { motion } from 'framer-motion'


const CreatePlane = ({ title, popupHandlerFunc }) => {

    const [crewMembers, setCrewMembers] = useState([])
    const [formData, setFormData] = useState({
        planeType: '',
        seatCount: '',
        planeCompany: ''
    })

    const formOnChangeHandler = (e, name) => {
        setFormData({...formData, [name]: e.target.value})
    }

    const createPlane = async () => {
        const isFormDataFilled = isDataFilled(formData)
    }

    return (
        <Popup 
            title={title} 
            popupHandlerFunc={popupHandlerFunc}
        >
            <div className="form">
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