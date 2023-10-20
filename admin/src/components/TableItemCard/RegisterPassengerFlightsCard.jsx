import './TableItemCard.scss'

const RegisterPassengerFlightsCard = ({ flightNumber, departureAirport, destinationAirport, flightPrice, flightStatus }) => {
    return(
        <div className="search__result__item">
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
                    <td className='td__info'>{flightStatus}</td>
                </tr>
            </tbody>
        </div>
    )
}   

export default RegisterPassengerFlightsCard;