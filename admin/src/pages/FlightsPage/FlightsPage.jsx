import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import FlightTableItemCard from '../../components/TableItemCard/FlightTableItemCard';
import NoItems from '../../components/NoItems/NoItems';
import { socket } from '../../socket.js';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import './FlightsPage.scss'


const FlightsPage = () => {

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
            {isCreateFlightOpenPopup ? <CreateFlightPopup title="Создание нового рейса" popupHandlerFunc={setIsCreateFlightOpenPopup} /> : null}
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
                            <input 
                                type="text" 
                                placeholder='Поиск рейса'
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