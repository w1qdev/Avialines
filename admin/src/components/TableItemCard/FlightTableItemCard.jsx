import TableItemCard from './TableItemCard'
import { useState } from 'react'
import './TableItemCard.scss'

const FlightTableItemCard = ({ flight }) => {

    const flightStatus = {
        'active': ['active', 'В рейсе'],
        'landed': ['landed', 'Приземлился'],
        'load': ['load', 'Загрузка'],
        'expected': ['expected', 'Ожидается']
    }

    const [status, setStatus] = useState(flightStatus[flight.flightStatus])

    return (
        <TableItemCard>
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
                    <td className={`flight-status ${status[0]}`}>{status[1]}</td>
                </tr>
            </tbody>
        </TableItemCard>
    )
}

export default FlightTableItemCard