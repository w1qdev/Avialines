import { motion } from "framer-motion";
import { useState } from "react";



const EditAirportsContent = ({ data }) => {

    const [formData, setFormData] = useState({...data})

    const saveChanges = (e) => {
        e.preventDefault()


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
                    <div className="body__input__title">Местоположение аэрапорта</div>
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