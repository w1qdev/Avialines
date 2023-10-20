import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import FlightTableItemCard from '../../components/TableItemCard/FlightTableItemCard';
import { toastError } from '../../utils/toasts';
import NoItems from '../../components/NoItems/NoItems';
import { socket } from '../../socket.js';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import axios from 'axios';
import './FlightsPage.scss'


const FlightsPage = () => {

    const [searchValue, setSearchValue] = useState('')
    const [flights, setFlights] = useState([])
    const [unChangedFlighs, setUnChangedFligths] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const popuphandler = () => setIsOpenPopup(prev => !prev)
    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    
        const filteredFlights = unChangedFlighs.filter(flight => {
            const FoundByName = flight.flightNumber.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPlace = flight.departureAirport.toLowerCase().includes(e.target.value.toLowerCase())
            const FoundByPrice = flight.flightPrice.toString().includes(e.target.value)
            if (FoundByName || FoundByPlace || FoundByPrice) return true
        })

        if (filteredFlights[0] != false) {
            console.log(flights)
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


    // useEffect(() => {
    //     setIsFetching(true)
    //     axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.GET_ALL}`)
    //     .then(res => {
    //         setFlights(res.data.body)
    //         setIsOpenPopup(false)
    //     })
    //     .catch(() => {
    //         toastError("Что-то пошло не так")
    //         setIsOpenPopup(false)
    //     })
    // }, [])


    return (
        <>
            {isOpenPopup && <CreateFlightPopup title="Создание нового рейса" popupHandlerFunc={setIsOpenPopup} />}
            <div className="dashboard">
                <motion.div 
                    className="dashboard__container"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }} 
                >
                    <div className="dashboard__container__header">
                        <div className="sections">
                            <div className='button'>Активные рейсы</div>
                            <div className='button'>Завершенные рейсы</div>
                        </div>
                        <div className="search">
                            <input 
                                type="text" 
                                placeholder='Поиск рейса (Номер рейса, место пасадки, цена)'
                                value={searchValue} 
                                onChange={searchHandler}
                            />
                        </div>
                        <button 
                            className="create-new-button"
                            onClick={popuphandler}
                            >Создать новый рейс
                        </button>
                    </div>
                    <div className="dashboard__container__body flights">

                        {flights.length >= 1 ? flights.map((flight) => (
                            <FlightTableItemCard key={flight.id} flight={flight} />
                        )) : (
                            <NoItems 
                                title='Рейсов не найдено 🤨' 
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