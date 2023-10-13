import { useEffect, useState } from 'react';
import CreateFlightPopup from '../../components/Popups/CreateFlight'
import { socket } from '../../socket';
import './FlightsPage.scss'

const FlightsPage = () => {

    const [flights, setFlights] = useState([])
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const popuphandler = () => setIsOpenPopup(prev => !prev)

    useEffect(() => {
        const onConnect = () => {
            console.log("Connected")
        }

        socket.on('connect', onConnect)

        return () => {
            socket.off('connect', onConnect)
        }
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
                        <div className="body__table-head">
                            <div className="head__row id">ID</div>
                            <div className="head__row flight-number">Номер рейса</div>
                            <div className="head__row departure-airport">Аэрапорт вылета</div>
                            <div className="head__row destination-airport">Аэрапорт назначения</div>
                            <div className="head__row flight-duration">Длительность рейса</div>
                            <div className="head__row flight-price">Цена рейса</div>
                            <div className="head__row flight-status">Состояние рейса</div>
                        </div>
                        <div className="table__item">
                            <div className="table__item-text id">2342342342434</div>
                            <div className="table__item-text flight-number">ABC1234</div>
                            <div className="table__item-text departure-airport">Москва, Шереметьево</div>
                            <div className="table__item-text destination-airport">Санкт-Петербург, Пулково</div>
                            <div className="table__item-text flight-duration">2ч 23мин</div>
                            <div className="table__item-text flight-price">5600₽</div>
                            <div className="table__item-text flight-status active">Active</div>
                        </div>

                        <div className="table__item">
                            <div className="table__item-text id">2342342342434</div>
                            <div className="table__item-text flight-number">ABC1234</div>
                            <div className="table__item-text departure-airport">Москва, Шереметьево</div>
                            <div className="table__item-text destination-airport">Санкт-Петербург, Пулково</div>
                            <div className="table__item-text flight-duration">2ч 23мин</div>
                            <div className="table__item-text flight-price">5600₽</div>
                            <div className="table__item-text flight-status active">Active</div>
                        </div>

                        <div className="table__item">
                            <div className="table__item-text id">2342342342434</div>
                            <div className="table__item-text flight-number">ABC1234</div>
                            <div className="table__item-text departure-airport">Москва, Шереметьево</div>
                            <div className="table__item-text destination-airport">Санкт-Петербург, Пулково</div>
                            <div className="table__item-text flight-duration">2ч 23мин</div>
                            <div className="table__item-text flight-price">5600₽</div>
                            <div className="table__item-text flight-status active">Active</div>
                        </div>

                        <div className="table__item">
                            <div className="table__item-text id">2342342342434</div>
                            <div className="table__item-text flight-number">ABC1234</div>
                            <div className="table__item-text departure-airport">Москва, Шереметьево</div>
                            <div className="table__item-text destination-airport">Санкт-Петербург, Пулково</div>
                            <div className="table__item-text flight-duration">2ч 23мин</div>
                            <div className="table__item-text flight-price">5600₽</div>
                            <div className="table__item-text flight-status active">Active</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default FlightsPage;