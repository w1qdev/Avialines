import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import AirportTableItemCard from '../../components/TableItemCard/AirportTableItemCard';
import { endpoints } from '../../api';
import { toastError } from '../../utils/toasts';
import { motion } from 'framer-motion';
import './AirportsPage.scss'

const AirportsPage = () => {

    const [airports, setAirports] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        setIsFetching(true)
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
        .then(res => {
            setAirports(res.data.body)
            setIsFetching(false)
            
        })
        .catch(err => {
            console.log(err)
            toastError("Что-то пошло не так, попробуйте позже")
            setIsFetching(false)
        })
    }, [])

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
                        <div className='title'>Аэрапорты</div>
                    </div>
                    <div className="search" style={{ width: "60%" }}>
                        <input type="text" placeholder='Поиск аэрапорта (id)' />
                    </div>
                    <button className="create-new-button">Добавить аэрапорт</button>
                </div>
                <div className="dashboard__container__body airport">
                    {airports.length ? airports.map(airport => (
                        <AirportTableItemCard key={airport.airportId} {...airport} />
                    )) : (
                        null // TODO: Показать, что самолетов нет (создать компонент)
                    )}

                    {isFetching ? (
                        <CircularProgressItem isFetching={isFetching} />
                    ) : null}
                </div>
            </motion.div>
        </div>
    )
}

export default AirportsPage;