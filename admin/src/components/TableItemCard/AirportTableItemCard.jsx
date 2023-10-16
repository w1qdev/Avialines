import TableItemCard from './TableItemCard';
import './TableItemCard.scss'

const AirportTableItemCard = ({ airportName, airportPlace }) => {
    return (
        <TableItemCard>
            <tbody>
                <tr>
                    <td>Название аэрапорта</td>
                    <td>{airportName}</td>
                </tr>
                <tr>
                    <td>Место нахождение:</td>
                    <td>{airportPlace}</td>
                </tr>
            </tbody>
        </TableItemCard>
    )
}

export default AirportTableItemCard;