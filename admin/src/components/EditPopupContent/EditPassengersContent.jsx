import { useState } from "react";
import { isDataFilled } from "../../utils/isDataFilled";
import { motion } from 'framer-motion'
import axios from "axios";

const EditPassengersContent = ({ data }) => {
    const [formData, setFormData] = useState({...data})

    const saveChanges = (e) => {
        e.preventDefault()



    }

    return (
        <form className="form">
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

export default EditPassengersContent;