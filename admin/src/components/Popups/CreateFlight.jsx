import { motion } from 'framer-motion'
import './Popup.scss'

const CreateFlight = ({ title, popupHandlerFunc }) => {
    

    const popupHandler = (e) => {
        // FIXME: Popup закрывается при нажатии на любой элемент
        e.stopPropagation()
        popupHandlerFunc(prev => !prev)
    }

    const createFlight = (e) => {
        e.preventDefault()
    }

    return (
        <div className="popup" onClick={e => popupHandler(e)}>
            <motion.div className="popup__container">
                <div className="popup__container__head">
                    <div className="head__title">{title}</div>
                    <div className="head__close" onClick={popupHandler}>
                        <img src="" alt="close" />
                    </div>
                </div>

                <div className="popup__container__body">
                    <form className='form'>
                        <div className="body__input">
                            <div className="item">
                                <div className="body__input__title">Аэрапорт вылета</div>
                                <input type="text" placeholder='Аэрапорт вылета' />
                            </div>
                            <div className="item">
                                <div className="body__input__title">Аэрапорт назначения</div>
                                <input type="text" placeholder='Аэрапорт назначения' />
                            </div>
                        </div>

                        <div className="body__input">
                            <div className="item">
                                <div className="body__input__title">Длительность полета</div>
                                <input type="text" placeholder='Длительность полета' />
                            </div>
                            <div className="item">
                                <div className="body__input__title">Цена рейса (эконом)</div>
                                <input type="text" placeholder='Цена рейса' />
                            </div>
                        </div>

                        <div className="body__lower">
                            <button 
                                type='submit'
                                onClick={createFlight}
                                >Создать новый рейс
                            </button>
                        </div>
                    </form>
                </div>                
            </motion.div>
        </div>
    )
}   

export default CreateFlight;