import TableItemCard from './TableItemCard'
import { useState } from 'react'
import { flightStatus } from '../../utils/flightsStatus.js'
import { Tooltip } from '@chakra-ui/react'
import './TableItemCard.scss'

const FlightTableItemCard = ({ flight }) => {

    const [status, setStatus] = useState(flightStatus[flight.flightStatus])

    return (
        <TableItemCard itemId={flight.flightNumber} itemCategory="flights">
            <tbody>
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
                    <td>Длительность рейса</td>
                    <td>{flight.flightDuration}</td>
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
            </tbody>
        </TableItemCard>
    )
}

export default FlightTableItemCard