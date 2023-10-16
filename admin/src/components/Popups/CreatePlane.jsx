import './Popup.scss'
import Popup from './Popup'
import { useState } from 'react'
import { motion } from 'framer-motion'


const CreatePlane = ({ title, popupHandlerFunc }) => {
    
    const [crewMembers, setCrewMembers] = useState([])

    const createPlane = () => {}

    return (
        <Popup 
            title={title} 
            popupHandlerFunc={popupHandlerFunc}
        >
            <div className="form">
                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Название самолета</div>
                        <input type="text" placeholder='Название самолета' />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Вмещаемое количестов мест</div>
                        <input type="number" placeholder='Количество мест' />
                    </div>
                </div>

                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Экипаж</div>

                        <div className="add__box">
                            
                            {/* <img src="" alt='' className="add__box__member">
                                
                            </img> */}
                        </div>

                        <div className="item__box">
                            {crewMembers.length ? crewMembers.map(member => {
                                <div className="item__box__member"></div>
                            }) : null}
                        </div>
                    </div>
                </div>

                <div className="body__lower">
                    <motion.button 
                        type='submit'
                        onClick={createPlane}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Создать новый рейс
                    </motion.button>
                </div>
            </div>
        </Popup>
    )
}

export default CreatePlane