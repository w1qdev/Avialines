import { useState, useEffect, useRef } from 'react';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import AirportTableItemCard from '../../components/TableItemCard/AirportTableItemCard';
import { socket } from '../../socket.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Kbd } from '@chakra-ui/react'
import { useKeyPress } from '../../hooks/useKeyPress';
import NoItems from '../../components/NoItems/NoItems';
import Magnifier from '../../components/Icons/Magnifier.jsx';
import CreateAirport from '../../components/Popups/CreateAirport';
import './AirportsPage.scss'


const AirportsPage = () => {
    // Страница со списком всех аэрапортов, а также их данных

    const searchInputRef = useRef()
    const isSearchKeyPressed = useKeyPress(['=', '+', 'Enter'], searchInputRef)
    const [isSearchValueFocused, setIsSearchValueFocused] = useState(false)
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
            <AnimatePresence>
                {isCreateAirportPopupOpen ? <CreateAirport title="Добавление аэропорта" popupHandlerFunc={popupHandler} /> : null}
            </AnimatePresence>
            <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}    
                >
                    <div className="dashboard__container__header">
                        <div className="header__title">
                            <div className='title'>Аэропорты</div>
                        </div>
                        <div className="search">
                            <div 
                                className="search__input"
                                style={{ border: `${isSearchValueFocused ? "3px solid #778bff" : ""}` }}
                            >
                                <span className='magnifier'>
                                    <Magnifier className="magnifier__item" />
                                </span>
                                <input 
                                    type="text" 
                                    name="search"
                                    placeholder='Поиск аэропорта'
                                    value={searchValue} 
                                    ref={searchInputRef}
                                    onChange={searchHandler}
                                    onFocus={() => setIsSearchValueFocused(true)}
                                    onBlur={() => setIsSearchValueFocused(false)}
                                />
                                <span className='keybind'>
                                    <Kbd colorScheme=''>enter</Kbd> <span>or</span> <Kbd>+</Kbd>
                                </span>
                            </div>
                        </div>
                        <button 
                            className="create-new-button"
                            onClick={popupHandler}
                            >Добавить аэропорт
                        </button>
                    </div>
                    <div className="dashboard__container__body airport">
                        {airports.length ? airports.map(airport => (
                            <AirportTableItemCard key={airport.airportId} {...airport} />
                        )) : (
                            <NoItems 
                                title="Аэропортов не найдено 😔"
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