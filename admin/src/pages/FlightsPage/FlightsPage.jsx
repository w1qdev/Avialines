import { useEffect, useState } from 'react';
import { endpoints } from '../../api';
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import FlightTableItemCard from '../../components/TableItemCard/FlightTableItemCard';
import { toastError } from '../../utils/toasts';
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
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.FLIGHTS.ROUTE}${endpoints.FLIGHTS.GET_ALL}`)
        .then(res => {
            setFlights(res.data.body)
            setIsOpenPopup(false)
        })
        .catch(() => {
            toastError("Что-то пошло не так")
            setIsOpenPopup(false)
        })
    }, [])


    return (
        <>
            {isOpenPopup && <CreateFlightPopup title="Создание нового рейса" popupHandlerFunc={setIsOpenPopup} />}
            <div className="dashboard">
                <div className="dashboard__container">
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
                </div>
            </div>
        </>

    )
}

export default FlightsPage;