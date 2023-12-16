import TableItemCard from './TableItemCard'

const PassengerTableItemCard = ({ id, seatNumber, fullName, flightNumber }) => {
    // Компонент для отображения данных пассажира в виде карточки

    const passengerData = { id, seatNumber, flightNumber, fullName }

    return (
        <TableItemCard data={passengerData} itemId={id} itemCategory="passengers" >
            <div className='table-item'>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>ФИО пассажира</div>
                    <div className='table-item__category__info'>{fullName}</div>
                </div>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>Номер рейса</div>
                    <div className='table-item__category__info'>{flightNumber}</div>
                </div>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>Номер места</div>
                    <div className='table-item__category__info'>{seatNumber}</div>
                </div>
            </div>
        </TableItemCard>
    )
}

export default PassengerTableItemCard;