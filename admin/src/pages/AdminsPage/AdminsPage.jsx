import { motion } from 'framer-motion';
import NoItems from '../../components/NoItems/NoItems';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import './AdminsPage.scss'
import AdminTableItemCard from '../../components/TableItemCard/AdminTableItemCard';
import CreateAdmin from '../../components/Popups/CreateAdmin';
import { socket } from '../../socket.js';
import { useState, useEffect } from 'react';


const AdminsPage = () => {

    const [searchValue, setSearchValue] = useState('')
    const [admins, setAdmins] = useState([])
    const [unChangedAdmins, setUnchangedAdmins] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isCreateAdminPopupOpen, setIsCreateAdminPopupOpen] = useState(false)

    const popupHandler = () => setIsCreateAdminPopupOpen(prev => !prev)

    const searchHandler = (e) => {
        setSearchValue(e.target.value)

        const filteredAdmins = unChangedAdmins.filter(admin => {
            const FoundByFullName = admin.fullName.toLowerCase().includes(e.target.value.toLowerCase())
            if (FoundByFullName) return true
        })

        if (filteredAdmins[0] != false) {
            setAdmins([...filteredAdmins])
        }

        if (e.target.value === '') {
            socket.emit('adminsDataGet', {})
        }
    }

    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('adminsDataGet', onAirportsData)
        }

        const onAirportsData = (data) => {
            console.log(data)
        }

        const response = (data) => {
            if (data.body.length) {
                setAdmins(data.body)
                setUnchangedAdmins(data.body)
            }

            setIsFetching(false)
        }

        socket.on('adminsResponse', response);
        socket.on('adminsUpdate', onUpdate)
        socket.emit('adminsDataGet', onAirportsData);

        return () => {
            socket.off('adminsResponse', response);
            socket.off('adminsUpdate', onUpdate);
            socket.off('adminsDataGet', onAirportsData);
        }
    }, [])



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
                                placeholder='Поиск администратора' 
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
                    <div className="dashboard__container__body">
                        {admins.length ? admins.map(admin => (
                            <AdminTableItemCard key={admin._id} {...admin} />
                        )) : (
                            <NoItems title="Админов не найдено 😔" />
                        )}

                        {isFetching ? <CircularProgressItem isFetching={isFetching} /> : null}
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default AdminsPage;