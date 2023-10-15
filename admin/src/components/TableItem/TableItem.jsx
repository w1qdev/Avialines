import './TableItem.scss'

const TableItem = ({ flight }) => {
    
    const fligthDuration = `${Math.floor(flight.flightDuration / 60)}ч ${Math.floor(flight.flightDuration % 60)}мин`


    return (
        <div className="table__item" key={flight.flightId}>
            <div className="table__item-text id">{flight.flightId}</div>
            <div className="table__item-text flight-number">{flight.flightNumber}</div>
            <div className="table__item-text departure-airport">{flight.departureAirport}</div>
            <div className="table__item-text destination-airport">{flight.destinationAirport}</div>
            <div className="table__item-text flight-duration">{fligthDuration}</div>
            <div className="table__item-text flight-price">{flight.flightPrice}₽</div>
            <div className="table__item-text flight-status active">{flight.flightStatus}</div>
        </div>
    )
}

export default TableItem;