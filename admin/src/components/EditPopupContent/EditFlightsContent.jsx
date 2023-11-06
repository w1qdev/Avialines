import { motion } from "framer-motion";

const EditFlightsContent = () => {

    const saveChanges = (e) => {
        e.preventDefault()

        
    }

    return (
        <form className="form">
            <div className="body__input">
                
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

export default EditFlightsContent;