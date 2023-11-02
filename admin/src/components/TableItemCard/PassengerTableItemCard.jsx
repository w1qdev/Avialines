import TableItemCard from './TableItemCard'

const PassengerTableItemCard = ({ id, seatNumber, fullName, passport }) => {
    return (
        <TableItemCard itemId={id} itemCategory="passengers" >
            <tbody>
                <tr>
                    <td>ФИО пассажира</td>
                    <td>{fullName}</td>
                </tr>
                <tr>
                    <td>Данные паспорта</td>
                    <td>{passport}</td>
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