import { motion } from 'framer-motion'
import closeButton from '../../assets/popup/close.svg'
import './Popup.scss'

const Popup = ({ title, popupHandlerFunc, children }) => {
    
    const popupHandler = () => popupHandlerFunc(prev => !prev)

    return (
        <div className="popup" onClick={popupHandler}>
            <motion.div 
                className="popup__container" 
                onClick={e => e.stopPropagation()}
                // framer-motion
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.4 }}

            >
                <div className="popup__container__head">
                    <div className="head__title">{title}</div>
                    <div className="head__close" onClick={popupHandler}>
                        <img src={closeButton} alt="close" />
                    </div>
                </div>

                <div className="popup__container__body">{children}</div>                
            </motion.div>
        </div>
    )
}   

export default Popup;