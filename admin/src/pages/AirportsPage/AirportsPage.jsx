import { useState, useEffect } from 'react';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import AirportTableItemCard from '../../components/TableItemCard/AirportTableItemCard';
import { socket } from '../../socket.js';
import { motion } from 'framer-motion';
import NoItems from '../../components/NoItems/NoItems';
import CreateAirport from '../../components/Popups/CreateAirport';
import './AirportsPage.scss'


const AirportsPage = () => {
    // Страница со списком всех аэрапортов, а также их данных

    const [airports, setAirports] = useState([])
    const [unChangedAirports, setUnChangedAirports] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isCreateAirportPopupOpen, setIsCreateAirportPopupOpen] = useState(false)


    const popupHandler = () => setIsCreateAirportPopupOpen(prev => !prev)

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    
        const filteredAirports = unChangedAirports.filter(airport => {
            const FoundByName = airport.airportName.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPlace = airport.airportPlace.toLowerCase().includes(e.target.value.toLowerCase())
            if (FoundByName || FoundByPlace) return true
        })

        if (filteredAirports[0] != false) {
            setAirports([...filteredAirports])
        }

        if (e.target.value === '') {
            socket.emit('airportsDataGet', {})
        }
    }


    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('airportsDataGet', onAirportsData)
        }

        const onAirportsData = (data) => {
            console.log(data)
        }

        const response = (data) => {
            if (data.body.length) {
                setAirports(data.body)
                setUnChangedAirports(data.body)
            }
            setIsFetching(false)
        }

        socket.on('airportsResponse', response);
        socket.on('airportsUpdate', onUpdate)
        socket.emit('airportsDataGet', onAirportsData);

        return () => {
            socket.off('airportsResponse', response);
            socket.off('airportsUpdate', onUpdate);
            socket.off('airportsDataGet', onAirportsData);
        }
    }, [])


    return (
        <>
            {isCreateAirportPopupOpen ? <CreateAirport title="Добавление аэрапорта" popupHandlerFunc={popupHandler} /> : null}
            <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}    
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Аэрапорты</div>
                        </div>
                        <div className="search">
                            <input 
                                type="text" 
                                placeholder='Поиск аэрапорта' 
                                value={searchValue}
                                onChange={searchHandler}
                            />
                        </div>
                        <button 
                            className="create-new-button"
                            onClick={popupHandler}
                            >Добавить аэрапорт
                        </button>
                    </div>
                    <div className="dashboard__container__body airport">
                        {airports.length ? airports.map(airport => (
                            <AirportTableItemCard key={airport.airportId} {...airport} />
                        )) : (
                            <NoItems 
                                title="Аэрапортов не найдено 😔"
                            />
                        )}
                        {isFetching ? (
                            <CircularProgressItem isFetching={isFetching} />
                        ) : null}
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default AirportsPage;