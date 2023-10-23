import { motion } from 'framer-motion'
import { useState } from 'react'
import './PassengersPage.scss'

const PassengersPage = () => {

    const [searchValue, setSearchValue] = useState('')

    const searchHandler = (e) => setSearchValue(e.target.value)

    return (
        <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }} 
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Управление пассажирами</div>
                        </div>
                        <div className="search">
                            <input 
                                type="text" 
                                placeholder='Поиск пассажира'
                                value={searchValue} 
                                onChange={searchHandler}
                            />
                        </div>
                        <button 
                            className="create-new-button"
                            >Добавить пассажира
                        </button>
                    </div>
                    <div className="dashboard__container__body">

                    </div>
                </motion.div>
            </div>
    )
}

export default PassengersPage