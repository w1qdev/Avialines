import './TableItemCard.scss'
import { flightStatus as flStatus } from '../../utils/flightsStatus';

const RegisterPassengerFlightsCard = ({ 
        flightNumber, 
        departureAirport, 
        destinationAirport, 
        flightPrice, 
        flightStatus,
        formData,
        setFormData
    }) => {

    const clickHandler = () => {
        setFormData({...formData, flightInfo: {
            flightNumber,
            departureAirport, 
            destinationAirport, 
            flightPrice,
            flightStatus
        }})
    }
    
    const currentStatus = flStatus[flightStatus]

    return(
        <div 
            className="search__result__item"
            onClick={clickHandler}
        >
            <tbody>
                <tr>
                    <td className='td__title'>Номер рейса</td>
                    <td className='td__info'>{flightNumber}</td>
                </tr>
                <tr>
                    <td className='td__title'>Аэрапорт вылета</td>
                    <td className='td__info'>{departureAirport}</td>
                </tr>
                <tr>
                    <td className='td__title'>Аэрапорт назначения</td>
                    <td className='td__info'>{destinationAirport}</td>
                </tr>
                <tr>
                    <td className='td__title'>Цена рейса (эконом)</td>
                    <td className='td__info'>{flightPrice}₽</td>
                </tr>
                <tr>
                    <td className='td__title'>Состояние рейса</td>
                    <td className={`td__info ${currentStatus[0]}`}>{currentStatus[1]}</td>
                </tr>
            </tbody>
        </div>
    )
}   

export default RegisterPassengerFlightsCard;