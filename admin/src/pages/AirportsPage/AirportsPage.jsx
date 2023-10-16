import { useState } from 'react';
import axios from 'axios';
import './AirportsPage.scss'
import { endpoints } from '../../api';
import { toastError } from '../../utils/toasts';

const AirportsPage = () => {

    const [airports, setAirports] = useState([])

    axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.AIRPORTS.ROUTE}${endpoints.AIRPORTS.GET_ALL}`)
    .then(res => {
        setAirports(res.data.body)
    })
    .catch(err => {
        console.log(err)
        toastError("Что-то пошло не так, попробуйте позже")
    })

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <div className="header__title">
                        <div className='title'>Аэрапорты</div>
                    </div>
                    <div className="search" style={{ width: "60%" }}>
                        <input type="text" placeholder='Поиск аэрапорта (id)' />
                    </div>
                    <button className="create-new-button">Добавить аэрапорт</button>
                </div>
                <div className="dashboard__container__body">
                    
                </div>
            </div>
        </div>
    )
}

export default AirportsPage;