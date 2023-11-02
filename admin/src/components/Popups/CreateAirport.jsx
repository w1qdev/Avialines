import { useState } from "react";
import { motion } from "framer-motion";
import { toastError } from "../../utils/toasts";
import { isDataFilled } from "../../utils/isDataFilled";
import Popup from "./Popup";

const CreateAirport = ({ title, popupHandlerFunc }) => {

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
    }

    return (
        <Popup title={title} popupHandlerFunc={popupHandlerFunc}>

            <form className="form">
                <div className="body__input">
                    <div className="item">
                        <div className="body__input__title">Введите название аэрапорта</div>
                        <input 
                            className='input'
                            type="text" 
                            placeholder="Название аэрапорта"
                            value={formData.airportName}
                            onChange={e => setFormData({ ...formData, airportName: e.target.value })}
                        />
                    </div>
                    <div className="item">
                        <div className="body__input__title">Введите местоположение аэрапорта (город)</div>
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
                        onClick={createAirport}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.3 }}
                        >Добавить новый аэрапорт
                    </motion.button>
                </div>
            </form>

        </Popup>
    )
}

export default CreateAirport;