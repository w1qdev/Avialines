import TableItemCard from './TableItemCard'

const PassengerTableItemCard = ({ id, seatNumber, fullName, passport, flightNumber }) => {

    const passengerData = { id, seatNumber, flightNumber, fullName }

    return (
        <TableItemCard data={passengerData} itemId={id} itemCategory="passengers" >
            <tbody>
                <tr>
                    <td>ФИО пассажира</td>
                    <td>{fullName}</td>
                </tr>
                <tr>
                    <td>Номер рейса</td>
                    <td>{flightNumber}</td>
                </tr>
                <tr>
                    <td>Номер места</td>
                    <td>{seatNumber}</td>
                </tr>
            </tbody>
        </TableItemCard>
    )
}

export default PassengerTableItemCard;