import { motion } from 'framer-motion';
import './AdminsPage.scss'
import CreateAdmin from '../../components/Popups/CreateAdmin';
import { useState } from 'react';



const AdminsPage = () => {

    const [searchValue, setSearchValue] = useState('')
    const [isCreateAdminPopupOpen, setIsCreateAdminPopupOpen] = useState(false)

    const popupHandler = () => setIsCreateAdminPopupOpen(prev => !prev)

    const searchHandler = (e) => {
        console.log(e)
    }

    return (
        <>
            {isCreateAdminPopupOpen ? <CreateAdmin title="Добавление админа" popupHandlerFunc={popupHandler} /> : null}
            <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}    
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Администраторы</div>
                        </div>
                        <div className="search" style={{ width: '50%' }}>
                            <input 
                                type="text" 
                                placeholder='Поиск админов' 
                                value={searchValue}
                                onChange={searchHandler}
                            />
                        </div>
                        <button 
                            className="create-new-button" 
                            style={{ width: '25%' }}
                            onClick={popupHandler}
                            >Добавить администратора
                        </button>
                    </div>
                    <div className="dashboard__container__body airport">
                        
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default AdminsPage;