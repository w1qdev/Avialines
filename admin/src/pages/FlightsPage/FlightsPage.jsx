import { useEffect, useState } from 'react';
import { endpoints } from '../../api';
import { motion } from 'framer-motion'
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import FlightTableItemCard from '../../components/TableItemCard/FlightTableItemCard';
import { toastError } from '../../utils/toasts';
import { socket } from '../../socket.js';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import axios from 'axios';
import './FlightsPage.scss'


const FlightsPage = () => {

    const [flights, setFlights] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const popuphandler = () => setIsOpenPopup(prev => !prev)


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
                            <input type="text" placeholder='Поиск рейса (id, имя пассажира, данные паспорта)' />
                        </div>
                        <button 
                            className="create-new-button"
                            onClick={popuphandler}
                            >Создать новый рейс
                        </button>
                    </div>
                    <div className="dashboard__container__body">

                        {flights.length >= 1 ? flights.map((flight) => (
                            <FlightTableItemCard key={flight.flightId} flight={flight} />
                        )) : (
                            <CircularProgressItem isFetching={isFetching} />
                        )}
                    </div>
                </motion.div>
            </div>
        </>

    )
}

export default FlightsPage;