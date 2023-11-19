import './TableItemCard.scss'
import axios from 'axios'
import { endpoints } from '../../api/index.js'
import { toastError } from '../../utils/toasts.js'
import { flightStatus as flStatus } from '../../utils/flightsStatus';
import { toastInfo } from '../../utils/toasts.js';

const RegisterPassengerFlightsCard = ({ 
        flightNumber, 
        departureAirport, 
        destinationAirport, 
        flightPrice, 
        flightStatus,
        flightTime,
        date,
        gate,
        formData,
        setFormData
    }) => {

    const clickHandler = () => {
        

        // console.log(formData)

        // const currentFlightNumber = flightNumber;
        // axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.PLANE}/${currentFlightNumber}`)
        // .then(res => {
        //     if (res.data.error) {
        //         toastError("Что-то пошло не так, попробуйте позже")
        //         return
        //     }
        //     setFormData({ ...formData, planeSeatPlaces: [...res.data.body] })
        //     toastInfo(`Рейс успешно выбран!`)
        // })
        // .catch(err => {
        //     console.log(err)
        //     toastError("Что-то пошло не так, попробуйте позже")
        // })


        setFormData(prevState => ({ ...prevState, flightInfo: {
            flightNumber,
            departureAirport, 
            destinationAirport, 
            flightPrice,
            flightTime,
            date,
            gate,
            flightStatus
        } }))

        // setFormData({...formData, })

        console.log(formData)


        if (flightNumber) {
            toastInfo(`Рейс успешно выбран`)
            const currentFlightNumber = flightNumber
            axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.PLANES.ROUTE}${endpoints.PLANES.PLANE}/${currentFlightNumber}`)
            .then(res => {
                setFormData(prevState => (
                    { ...prevState, planeSeatPlaces: [...res.data.body] }
                ))
            })
            .catch(err => {
                console.error(err)
                toastError("Что-то пошло не так, попробуйте позже")
            })
        }
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