import TableItemCard from './TableItemCard'
import { useState } from 'react'
import { flightStatus } from '../../utils/flightsStatus.js'
import { Tooltip } from '@chakra-ui/react'
import './TableItemCard.scss'


const FlightTableItemCard = ({ flight }) => {
    // Компонент для отображения данных рейса в виде карточки

    const [status, setStatus] = useState(flightStatus[flight.flightStatus])
   
    return (
        <TableItemCard 
            data={flight}
            itemId={flight.flightNumber} 
            itemCategory="flights"
        >
            <div className='table-item'>
                <tr>
                    <td>Номер рейса</td>
                    <td>{flight.flightNumber}</td>
                </tr>
                <tr>
                    <td>Аэрапорт вылета</td>
                    <td>{flight.departureAirport}</td>
                </tr>
                <tr>
                    <td>Аэрапорт назначения</td>
                    <td>{flight.destinationAirport}</td>
                </tr>
                <tr>
                    <td>Самолет рейса</td>
                    <td>{flight.flightPlaneType}</td>
                </tr>
                <tr>
                    <td>Время посадки</td>
                    <td>{flight.flightTime} | {flight.date}</td>
                </tr>
                <tr>
                    <td>Цена рейса (эконом)</td>
                    <td>{flight.flightPrice}₽</td>
                </tr>
                
                <tr className='current-status'>
                    <td>Состояние рейса</td>
                    <Tooltip hasArrow label='Текущий статус рейса' bg='#2c2c2c' color='#fff' placement='top'>
                        <td className={`flight-status ${status[0]}`}>{status[1]}</td>
                    </Tooltip>
                </tr>
            </div>
        </TableItemCard>
    )
}

export default FlightTableItemCard;