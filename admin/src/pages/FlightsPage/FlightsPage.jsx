import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import FlightTableItemCard from '../../components/TableItemCard/FlightTableItemCard';
import NoItems from '../../components/NoItems/NoItems';
import { socket } from '../../socket.js';
import { Kbd } from '@chakra-ui/react'
import { useKeyPress } from '../../hooks/useKeyPress.js';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import Magnifier from '../../components/Icons/Magnifier.jsx';
import './FlightsPage.scss'


const FlightsPage = () => {
    // Страница со списком всех рейсов, а также их данных

    const searchInputRef = useRef()
    const isSearchKeyPressed = useKeyPress(['=', '+', 'Enter'], searchInputRef)
    const [isSearchValueFocused, setIsSearchValueFocused] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [flights, setFlights] = useState([])
    const [unChangedFlighs, setUnChangedFligths] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isCreateFlightOpenPopup, setIsCreateFlightOpenPopup] = useState(false)


    const popuphandler = () => setIsCreateFlightOpenPopup(prev => !prev)
    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    
        const filteredFlights = unChangedFlighs.filter(flight => {
            const FoundByName = flight.flightNumber.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByDepartureAirport = flight.departureAirport.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundBydestinationAirport = flight.destinationAirport.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPlaneType = flight.flightPlaneType.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPrice = flight.flightPrice.toString().includes(e.target.value)
            const FoundByTime = flight.flightTime.toString().includes(e.target.value)
            const FoundByDate = flight.date.toString().includes(e.target.value)

            if (
                FoundByName || 
                FoundByDepartureAirport || 
                FoundByPrice || 
                FoundBydestinationAirport ||
                FoundByPlaneType ||
                FoundByTime || 
                FoundByDate
            ) return true
        })

        if (filteredFlights[0] != false) {
            setFlights([...filteredFlights])
        }

        if (e.target.value === '') {
            socket.emit('flightsDataGet', {})
        }
    }


    useEffect(() => {
        setIsFetching(true)

        const onUpdate = () => {
            socket.emit('flightsDataGet', onFlightsData)
        }
        
        const onFlightsData = (data) => {
            console.log(data)
        }
        
        const response = (data) => {
            if (data.body.length) {
                setFlights(data.body)
                setUnChangedFligths(data.body)
            }
            setIsFetching(false)
        }

        socket.on('flightsResponse', response)
        socket.on('flightsUpdate', onUpdate)
        socket.emit('flightsDataGet', onFlightsData)

        return () => {
            socket.off('flightsResponse', response);
            socket.off('flightsUpdate', onUpdate);
            socket.off('flightsDataGet', onFlightsData);
        }
    }, [])

    return (
        <>
            <AnimatePresence>
                {isCreateFlightOpenPopup ? <CreateFlightPopup title="Создание нового рейса" popupHandlerFunc={setIsCreateFlightOpenPopup} /> : null}
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
                            <div className='title'>Рейсы</div>
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
                                    placeholder='Поиск рейса'
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
                            onClick={popuphandler}
                            >Создать новый рейс
                        </button>
                    </div>
                    <div className="dashboard__container__body flights">

                        {flights.length >= 1 ? flights.map((flight) => (
                            <FlightTableItemCard key={flight._id} flight={flight} />
                        )) : (
                            <NoItems 
                                title='Рейсов не найдено 😔' 
                                socketEmitEndpoint="isFlightsUpdate" 
                            />
                        )}

                        { isFetching ? (
                            <CircularProgressItem isFetching={isFetching} />
                        ) : (null) }
                    </div>
                </motion.div>
            </div>
        </>

    )
}

export default FlightsPage;