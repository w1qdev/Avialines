import TableItemCard from './TableItemCard';
import './TableItemCard.scss'

const AirportTableItemCard = ({ airportId, airportName, airportPlace }) => {
    // Компонент для отображения данных аэрапорта в виде карточки

    const airportData = { airportName, airportPlace, airportId }

    return (
        <TableItemCard 
            data={airportData} 
            itemId={airportId}
            itemCategory="airports" 
        >
            <div className='table-item'>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>Название аэропорта:</div>
                    <div className='table-item__category__info'>{airportName}</div>
                </div>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>Местонахождение:</div>
                    <div className='table-item__category__info'>{airportPlace}</div>
                </div>
            </div>
            
        </TableItemCard>
    )
}

export default AirportTableItemCard;